import { Injectable } from '@nestjs/common';
import { TattoosRepository } from 'src/domains/tattoos/repositories/tattoos.repository';

@Injectable()
export class TattooService {
  constructor(private readonly tattooRepository: TattoosRepository) {}

  async create(file: Express.Multer.File, tattooArtistId: number) {
    return await this.tattooRepository.create(file, tattooArtistId);
  }

  async findAll() {
    return await this.tattooRepository.findAll();
  }

  async findOne(id: number) {
    return await this.tattooRepository.findOne(id);
  }

  async delete(id: number) {
    return await this.tattooRepository.delete(id);
  }
}
