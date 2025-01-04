import { Injectable } from '@nestjs/common';
import { CreateTattooArtistDTO } from 'src/common/classes/DTOs/tattoo-artists/CreateTattooArtistDTO';
import { TattooArtistsRepository } from 'src/repositories/TattooArtistsRepository';

@Injectable()
export class TattooArtistService {
  constructor(private readonly tattooArtistsRepository: TattooArtistsRepository) {}

  async create(createTattooArtistDTO: CreateTattooArtistDTO, userID: number) {
    return await this.tattooArtistsRepository.create(createTattooArtistDTO, userID);
  }

  async findAll() {
    return await this.tattooArtistsRepository.findAll();
  }

  async findOne(id: number) {
    return await this.tattooArtistsRepository.findOne(id);
  }

  async delete(id: number) {
    return await this.tattooArtistsRepository.delete(id);
  }
}
