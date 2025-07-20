import { TattooArtistsRepository } from '@core/repositories/tattoo-artist.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TattooArtistService {
  constructor(private readonly tattooArtistsRepository: TattooArtistsRepository) {}

  async find() {
    return await this.tattooArtistsRepository.find();
  }
}
