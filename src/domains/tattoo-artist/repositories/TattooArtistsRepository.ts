import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchedulingDTO } from 'src/architecture/dtos/schedulings/SchedulingDTO';
import { RolesEnum } from 'src/architecture/enums/roles.enum';
import { CreateTattooArtistDTO } from 'src/domains/tattoo-artist/dtos/CreateTattooArtistDTO';
import { TattooArtistsEntity } from 'src/domains/tattoo-artist/entities/TattooArtistsEntity';
import { UsersEntity } from 'src/domains/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TattooArtistsRepository {
  constructor(
    @InjectRepository(TattooArtistsEntity) private readonly repository: Repository<TattooArtistsEntity>,
    private readonly datasource: DataSource,
  ) {}

  async updateBooking(tattooArtistId: number, updateBookingDto: SchedulingDTO) {
    const tattooArtist = await this.repository.findOneBy({ id: tattooArtistId });
    if (!tattooArtist) throw new NotFoundException(`Tattoo artist with id ${tattooArtistId} not found`);

    tattooArtist.setSchedulings(updateBookingDto);
    return await this.repository.save(tattooArtist);
  }

  async create(createTattooArtistDTO: CreateTattooArtistDTO, userID: number) {
    const userIsTattooArtist = await this.repository.findOne({ where: { userId: userID } });
    if (userIsTattooArtist) throw new ConflictException('User is tattoo artist');

    const result = await this.datasource.transaction(async (manager) => {
      const user = await manager.findOne(UsersEntity, { where: { id: userID } });
      user.setRoles([...user.roles, RolesEnum.TATTOO_ARTIST]);

      const tattooArtistEntity = this.repository.create({ ...createTattooArtistDTO, userId: userID });
      await manager.save(user);
      return await manager.save(TattooArtistsEntity, tattooArtistEntity);
    });

    return result;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async findBookingsByTattooArtist(id: number) {
    const tattooArtists = await this.repository.findOneBy({ id });
    if (!tattooArtists) throw new NotFoundException(`Tattoo Artist with id ${id} not found`);
    return { id: tattooArtists.id, name: tattooArtists.name, bookings: tattooArtists.schedulings };
  }

  async findAllBookings() {
    return await this.repository.find({ select: { id: true, name: true, schedulings: {} } });
  }

  async delete(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return await this.repository.softRemove(user);
  }
}
