import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@users/dtos/create-user.dto';
import { ListUserDTO } from '@users/dtos/list-user.dto';
import { UpdateUserDto } from '@users/dtos/update-user.dto';
import { UserRepository } from '@users/repositories/user.repository';
import { TattooLikeRepository } from 'src/core/repositories/tattoo-likes.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private tattooLikeRepository: TattooLikeRepository,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const userExist = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (userExist) throw new ConflictException('Email alredy registered');

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async find(query: ListUserDTO) {
    const users = await this.userRepository.findMany(query);
    return users.map((user) => user.toModel());
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ relations: { tattooArtist: { tattoos: true } }, where: { id } });
    const userModel = user.toModel();
    const userLikes = await this.tattooLikeRepository.find({ where: { userId: id } });
    const likedTattooIds = userLikes.map((like) => like.tattooId);
    userModel.tattooArtist.tattoos = userModel.tattooArtist.tattoos.map((item) => {
      return { ...item, liked: likedTattooIds.includes(item.id) };
    });
    return userModel;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    return await this.userRepository.softRemove(user);
  }
}
