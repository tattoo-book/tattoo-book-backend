import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TattooArtistsEntity, UsersEntity } from '@tattoo-book-architecture';
import { RolesEnum } from '@tattoo-book-architecture/enums';
import { CreateTattooArtistDTO } from 'src/modules/tattoo-artist/dtos/CreateTattooArtistDTO';
import { UpdateTattooArtistDTO } from 'src/modules/tattoo-artist/dtos/update.tattoo.artist';
import { TattooArtistsRepository } from 'src/shared/repositories/tattoo-artist.repository';
import { DataSource } from 'typeorm';
import { HorariosDocument, HorariosFileType } from './document/horarios/horarios.document';

@Injectable()
export class TattooArtistService {
  constructor(
    private readonly tattooArtistsRepository: TattooArtistsRepository,
    private readonly datasource: DataSource,
  ) {}

  async create(createTattooArtistDTO: CreateTattooArtistDTO, userID: number) {
    const userIsTattooArtist = await this.tattooArtistsRepository.findOne({ where: { userId: userID } });
    if (userIsTattooArtist) throw new ConflictException('User is tattoo artist');

    const result = await this.datasource.transaction(async (manager) => {
      const user = await manager.findOne(UsersEntity, { where: { id: userID } });
      user.setRoles([...user.roles, RolesEnum.TATTOO_ARTIST]);

      const tattooArtistEntity = this.tattooArtistsRepository.create({ ...createTattooArtistDTO, userId: userID });
      await manager.save(user);
      return await manager.save(TattooArtistsEntity, tattooArtistEntity);
    });

    return result;
  }

  async download(type: HorariosFileType) {
    const schedulings = await this.tattooArtistsRepository.findOne({ where: { id: 2 } });
    const document = HorariosDocument.create(type, schedulings.schedulings);
    return document.build().export();
  }

  async find() {
    return await this.tattooArtistsRepository.find();
  }

  async findOne(id: number) {
    return await this.tattooArtistsRepository.findOneBy({ id });
  }

  async update(id: number, updateTattooArtistDTO: UpdateTattooArtistDTO) {
    const user = await this.tattooArtistsRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return await this.tattooArtistsRepository.save({ ...user, ...updateTattooArtistDTO });
  }

  async delete(id: number) {
    const user = await this.tattooArtistsRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return await this.tattooArtistsRepository.softRemove(user);
  }
}
