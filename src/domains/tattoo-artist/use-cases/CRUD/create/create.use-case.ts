import { TattooArtistsRepository } from '@core/repositories/tattoo-artist.repository';
import { CreateTattooArtistDTO } from '@domains/tattoo-artist/dtos/CreateTattooArtistDTO';
import { ConflictException, Injectable } from '@nestjs/common';
import { TattooArtistsEntity, UsersEntity } from '@tattoo-book-architecture/entities';
import { RolesEnum } from '@tattoo-book-architecture/enums';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateTattooArtistUseCase {
  constructor(
    private readonly tattooArtistsRepository: TattooArtistsRepository,
    private readonly dataSource: DataSource,
  ) {}

  async execute(createTattooArtistDTO: CreateTattooArtistDTO, userID: number) {
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
}
