import { Injectable, NotFoundException } from '@nestjs/common';
import { TattoosRepository } from 'src/domains/tattoos/repositories/tattoos.repository';

@Injectable()
export class TattooService {
  constructor(private readonly tattooRepository: TattoosRepository) {}

  async create(file: Express.Multer.File, tattooArtistId: number) {
    const imageExtension = file.mimetype.split('/')[1];
    const tattooEntity = this.tattooRepository.create({
      image: file.buffer,
      imageExtension,
      imageName: file.originalname,
      tattooArtistId,
    });

    return await this.tattooRepository.save(tattooEntity);
  }

  async findAll() {
    return await this.tattooRepository.find();
  }

  async findOne(id: number) {
    return await this.tattooRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);
    return await this.tattooRepository.softRemove(tattoo);
  }
}
