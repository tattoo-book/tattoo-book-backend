import { TattooArtistsRepository } from '@core/repositories/tattoo-artist.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteTattooArtistUseCase {
  constructor(private readonly tattooArtistsRepository: TattooArtistsRepository) {}

  async execute(id: number) {
    const user = await this.tattooArtistsRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return await this.tattooArtistsRepository.softRemove(user);
  }
}
