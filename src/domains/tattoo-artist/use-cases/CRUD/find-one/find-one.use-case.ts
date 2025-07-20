import { TattooArtistsRepository } from '@core/repositories/tattoo-artist.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindOneTattooArtistUseCase {
  constructor(private readonly tattooArtistsRepository: TattooArtistsRepository) {}

  async execute(id: number) {
    return await this.tattooArtistsRepository.findOneBy({ id });
  }
}
