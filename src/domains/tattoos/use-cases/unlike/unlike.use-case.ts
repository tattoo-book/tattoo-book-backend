import { TattooLikeRepository } from '@core/repositories/tattoo-likes.repository';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UnlikeTattooUseCase {
  constructor(private readonly tattooLikeRepository: TattooLikeRepository) {}

  async execute(tattooId: number, userId: number) {
    const tattooLike = await this.tattooLikeRepository.findOneBy({ tattooId, userId });
    if (!tattooLike) {
      throw new ConflictException('Você ainda não curtiu essa tatuagem');
    }
    return await this.tattooLikeRepository.remove(tattooLike);
  }
}
