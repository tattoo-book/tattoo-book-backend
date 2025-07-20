import { TattooLikeRepository } from '@core/repositories/tattoo-likes.repository';
import { TattoosRepository } from '@core/repositories/tattoos.repository';
import { ListTattoosDTO } from '@domains/tattoos/dtos/list-tattoo.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindManyTattoosUseCase {
  constructor(
    private readonly tattooRepository: TattoosRepository,
    private readonly tattooLikeRepository: TattooLikeRepository,
  ) {}

  async execute(query: ListTattoosDTO, userId: number) {
    const tattoos = await this.tattooRepository.findMany(query);

    if (query.includes?.includes('likes')) {
      const userLikes = await this.tattooLikeRepository.find({ where: { userId } });
      const likedTattooIds = userLikes.map((like) => like.tattooId);
      return tattoos.map((tattoo) => ({ ...tattoo, liked: likedTattooIds.includes(tattoo.id), likes: undefined }));
    }
    return tattoos;
  }
}
