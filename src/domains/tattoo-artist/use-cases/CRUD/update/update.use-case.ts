import { TattooArtistsRepository } from '@core/repositories/tattoo-artist.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTattooArtistDTO } from '../../../dtos/update.tattoo.artist';

@Injectable()
export class UpdateTattooArtistUseCase {
  constructor(private readonly tattooArtistsRepository: TattooArtistsRepository) {}

  async execute(id: number, updateTattooArtistDTO: UpdateTattooArtistDTO) {
    const user = await this.tattooArtistsRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return await this.tattooArtistsRepository.save({ ...user, ...updateTattooArtistDTO });
  }
}
