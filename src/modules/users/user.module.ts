import { BaseRepository } from '@architecture/repositories/base.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsEntity } from 'src/domain/entities/tattoo-artist.entity';
import { TattoosLikesEntity } from 'src/domain/entities/tattoos-likes';
import { TattoosEntity } from 'src/domain/entities/tattoos.entity';
import { UsersEntity } from 'src/domain/entities/user.entity';
import { TattooLikeRepository } from 'src/domain/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/domain/repositories/tattoos.repository';
import { TattooArtistsRepository } from 'src/modules/tattoo-artist/repositories/tattoo-artist.repository';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { UsersController } from 'src/modules/users/user.controller';
import { UsersService } from 'src/modules/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, TattoosLikesEntity, TattoosEntity, TattooArtistsEntity, TattoosLikesEntity]),
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
