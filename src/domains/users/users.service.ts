import { Injectable } from '@nestjs/common';
import { TattooLikeRepository } from 'src/@core/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/@core/repositories/tattoos.repository';
import { UserRepository } from 'src/@core/repositories/user.repository';
import { ListUserDTO } from 'src/domains/users/dtos/list-user.dto';
import { UpdateUserDto } from 'src/domains/users/dtos/update-user.dto';
import { In } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tattooLikeRepository: TattooLikeRepository,
    private readonly tattooRepository: TattoosRepository,
  ) {}

  public async find(query: ListUserDTO) {
    const users = await this.userRepository.findMany(query);
    return users.map((user) => user.toModel());
  }

  public async findOne(id: number) {
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

    return { ...userModel, tattoos: tattoos.map((item) => ({ ...item, liked: true })) };
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    return await this.userRepository.save(this.userRepository.merge(user, updateUserDto));
  }

  public async delete(id: number) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    return await this.userRepository.softRemove(user);
  }
}
