import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  BaseRepository,
  StudiosEntity,
  TattooArtistsEntity,
  TattoosEntity,
  TattoosLikesEntity,
  UsersEntity,
} from '@tattoo-book-architecture';
import { TattooArtistsRepository } from 'src/shared/repositories/tattoo-artist.repository';
import { TattooLikeRepository } from 'src/shared/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/shared/repositories/tattoos.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabaseModule.connect()),
    TypeOrmModule.forFeature([
      UsersEntity,
      StudiosEntity,
      TattoosLikesEntity,
      TattoosEntity,
      TattooArtistsEntity,
      TattoosLikesEntity,
    ]),
  ],
  providers: [UserRepository, BaseRepository, TattooLikeRepository, TattooArtistsRepository, TattoosRepository],
  exports: [UserRepository, BaseRepository, TattooLikeRepository, TattooArtistsRepository, TattoosRepository],
})
export class DatabaseModule {
  static connect(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME,
      entities: [],
      logging: true,
      autoLoadEntities: true,
    };
  }
}
