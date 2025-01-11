import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TattoosEntity } from 'src/entities/TattoosEntity';
import { Repository } from 'typeorm';

@Injectable()
export class TattoosRepository {
  constructor(@InjectRepository(TattoosEntity) private readonly tattoosRepository: Repository<TattoosEntity>) {}

  async create(file: Express.Multer.File, tattooArtistId: number) {
    const imageExtension = file.mimetype.split('/')[1];
    const tattooEntity = this.tattoosRepository.create({
      image: file.buffer,
      imageExtension,
      imageName: file.originalname,
      tattooArtistId,
    });
    const result = await this.tattoosRepository.save(tattooEntity);
    console.log(file.originalname);
    console.log(imageExtension);
    return result;
  }

  async findAll() {
    return await this.tattoosRepository.find();
  }

  async findOne(id: number) {
    const tattoo = await this.tattoosRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);
    return tattoo;
  }

  async delete(id: number) {
    const tattoo = await this.tattoosRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);
    return await this.tattoosRepository.softRemove(tattoo);
  }
}
