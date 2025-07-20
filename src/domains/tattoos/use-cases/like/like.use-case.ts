import { TattooLikeRepository } from '@core/repositories/tattoo-likes.repository';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class LikeTattooUseCase {
  constructor(private readonly tattooLikeRepository: TattooLikeRepository) {}

  async execute(tattooId: number, userId: number) {
    const tattooLike = await this.tattooLikeRepository.findOneBy({ tattooId, userId });
    if (tattooLike) {
      throw new ConflictException('Você já curtiu essa tatuagem');
    }
    const tattooLikeEntity = this.tattooLikeRepository.create({ tattooId, userId });
    return await this.tattooLikeRepository.save(tattooLikeEntity);
  }
}
