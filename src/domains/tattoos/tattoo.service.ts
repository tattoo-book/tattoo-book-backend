import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ListTattoosDTO } from '@tattoos/dtos/list-tattoo.dto';
import { UpdateTatttooDTO } from '@tattoos/dtos/update-tattoo.dto';
import { TattoosRepository } from '@tattoos/repositories/tattoos.repository';

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

  async find(query: ListTattoosDTO) {
    console.log('FIND MANY TATTOO: ', query);
    return await this.tattooRepository.findMany(query);
  }

  async findOne(id: number) {
    return await this.tattooRepository.findOne({ where: { id } });
  }

  async update(id: number, userId: number, updateTattooDTO: UpdateTatttooDTO) {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);
    if (tattoo.tattooArtistId !== userId) throw new UnauthorizedException('Apenas o dono pode editar essa tatuagem');

    const tattooUpdated = this.tattooRepository.merge(tattoo, updateTattooDTO);
    return await this.tattooRepository.save(tattooUpdated);
  }

  async delete(id: number) {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);
    return await this.tattooRepository.softRemove(tattoo);
  }
}
