import { BaseRepository } from '@architecture/repositories/base.repository';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsRepository } from 'src/domains/tattoo-artist/repositories/tattoo-artist.repository';
import { UserRepository } from 'src/domains/users/repositories/user.repository';
import { UsersController } from 'src/domains/users/user.controller';
import { UsersService } from 'src/domains/users/users.service';
import { RabbitmqModule } from 'src/external/rabbitmq/rabbitmq.module';
import { TattooArtistsEntity } from 'src/shared/entities/tattoo-artist.entity';
import { TattoosLikesEntity } from 'src/shared/entities/tattoos-likes';
import { TattoosEntity } from 'src/shared/entities/tattoos.entity';
import { UsersEntity } from 'src/shared/entities/user.entity';
import { TattooLikeRepository } from 'src/shared/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/shared/repositories/tattoos.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, TattoosLikesEntity, TattoosEntity, TattooArtistsEntity, TattoosLikesEntity]),
    ClientsModule.register([RabbitmqModule.registerEmailClient()]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    BaseRepository,
    TattooLikeRepository,
    TattooArtistsRepository,
    TattoosRepository,
  ],
})
export class UserModule {}
