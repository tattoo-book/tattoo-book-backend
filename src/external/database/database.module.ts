import { StudiosRepository } from '@core/repositories/studios.repositories';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  StudiosEntity,
  TattooArtistsEntity,
  TattoosEntity,
  TattoosLikesEntity,
  UsersEntity,
} from '@tattoo-book-architecture/entities';
import { BaseRepository } from '@tattoo-book-architecture/repositories';
import { TattooArtistsRepository } from 'src/@core/repositories/tattoo-artist.repository';
import { TattooLikeRepository } from 'src/@core/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/@core/repositories/tattoos.repository';
import { UserRepository } from 'src/@core/repositories/user.repository';

const repositories = [
  UserRepository,
  BaseRepository,
  TattooLikeRepository,
  TattooArtistsRepository,
  TattoosRepository,
  StudiosRepository,
];
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME,
      entities: [],
      logging: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([
      UsersEntity,
      StudiosEntity,
      TattoosLikesEntity,
      TattoosEntity,
      TattooArtistsEntity,
      TattoosLikesEntity,
    ]),
  ],
  providers: repositories,
  exports: repositories,
})
export class TattooBookDatabaseModule {}
