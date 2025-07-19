import { TattooLikeRepository } from '@core/repositories/tattoo-likes.repository';
import { TattoosRepository } from '@core/repositories/tattoos.repository';
import { UserRepository } from '@core/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

@Injectable()
export class FindOneUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tattooLikeRepository: TattooLikeRepository,
    private readonly tattooRepository: TattoosRepository,
  ) {}

  public async execute(id: number) {
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
}
