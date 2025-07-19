import { TattooArtistsRepository } from '@core/repositories/tattoo-artist.repository';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TattooArtistsEntity, UsersEntity } from '@tattoo-book-architecture/entities';
import { RolesEnum } from '@tattoo-book-architecture/enums';
import { DataSource } from 'typeorm';
import { HoursFileType, ScheduleDocument } from './document/horarios/horarios.document';
import { CreateTattooArtistDTO } from './dtos/CreateTattooArtistDTO';
import { UpdateTattooArtistDTO } from './dtos/update.tattoo.artist';

@Injectable()
export class TattooArtistService {
  constructor(
    private readonly tattooArtistsRepository: TattooArtistsRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(createTattooArtistDTO: CreateTattooArtistDTO, userID: number) {
    const userIsTattooArtist = await this.tattooArtistsRepository.findOne({ where: { userId: userID } });
    if (userIsTattooArtist) throw new ConflictException('User is tattoo artist');

    const result = await this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(UsersEntity, { where: { id: userID } });
      user.setRoles([...user.roles, RolesEnum.TATTOO_ARTIST]);

      const tattooArtistEntity = this.tattooArtistsRepository.create({ ...createTattooArtistDTO, userId: userID });
      await manager.save(user);
      return await manager.save(TattooArtistsEntity, tattooArtistEntity);
    });

    return result;
  }

  async download(type: HoursFileType) {
    const scheduling = await this.tattooArtistsRepository.findOne({ where: { id: 2 } });
    const document = ScheduleDocument.create(type, scheduling.schedulings);
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
