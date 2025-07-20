import { QueryParamsPaginated } from '@core/dtos/query-params-paginated';
import { TattooLikeRepository } from '@core/repositories/tattoo-likes.repository';
import { TattoosRepository } from '@core/repositories/tattoos.repository';
import { Injectable } from '@nestjs/common';
import { TattooArtistsEntity } from '@tattoo-book-architecture/entities';

@Injectable()
export class FindManyTattoosUseCase {
  constructor(
    private readonly tattooRepository: TattoosRepository,
    private readonly tattooLikeRepository: TattooLikeRepository,
  ) {}

  async execute(query: QueryParamsPaginated<TattooArtistsEntity>, userId: number) {
    const tattoos = await this.tattooRepository.findMany(query);

    if (query.includes?.includes('likes')) {
      const userLikes = await this.tattooLikeRepository.find({ where: { userId } });
      const likedTattooIds = userLikes.map((like) => like.tattooId);
      return tattoos.map((tattoo) => ({ ...tattoo, liked: likedTattooIds.includes(tattoo.id), likes: undefined }));
    }
    return tattoos;
  }
}
