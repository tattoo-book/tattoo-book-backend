import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TattooLikeRepository } from 'src/domain/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/domain/repositories/tattoos.repository';
import { TattooArtistsRepository } from 'src/modules/tattoo-artist/repositories/tattoo-artist.repository';
import { CreateUserDTO } from 'src/modules/users/dtos/create-user.dto';
import { ListUserDTO } from 'src/modules/users/dtos/list-user.dto';
import { UpdateUserDto } from 'src/modules/users/dtos/update-user.dto';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { In } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tattooLikeRepository: TattooLikeRepository,
    private readonly tattooArtistRepository: TattooArtistsRepository,
    private readonly tattooRepository: TattoosRepository,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const userExist = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (userExist) throw new ConflictException('Email já cadastrado');

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create(createUserDto);
    const artist = this.tattooArtistRepository.create({ name: user.name });
    return await this.userRepository.save({ ...user, tattooArtist: artist });
  }

  async find(query: ListUserDTO) {
    const users = await this.userRepository.findMany(query);
    return users.map((user) => user.toModel());
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      relations: { tattooArtist: { tattoos: true } },
      where: { id },
    });
    const userModel = user.toModel();
    const userLikes = await this.tattooLikeRepository.find({ where: { userId: id } });
    const likedTattooIds = userLikes.map((item) => item.tattooId);
    const tattoos = await this.tattooRepository.find({ where: { id: In(likedTattooIds) } });

    if (userModel.tattooArtist) {
      userModel.tattooArtist.tattoos = userModel.tattooArtist.tattoos.map((item) => {
        return { ...item, liked: likedTattooIds.includes(item.id) };
      });
    }

    return {
      ...userModel,
      tattoos: tattoos.map((item) => {
        return { ...item, liked: true };
      }),
    };
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
