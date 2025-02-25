import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsRepository } from '@tattoo-artist/repositories/tattoo-artist.repository';
import { TattooService } from '@tattoos/tattoo.service';
import { TattooController } from '@tattoos/tattoos.controller';
import { TattooArtistsEntity } from 'src/core/entities/tattoo-artist.entity';
import { TattoosLikesEntity } from 'src/core/entities/tattoos-likes';
import { TattoosEntity } from 'src/core/entities/tattoos.entity';
import { TattooLikeRepository } from 'src/core/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/core/repositories/tattoos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TattoosEntity, TattoosLikesEntity, TattooArtistsEntity])],
  controllers: [TattooController],
  providers: [TattooService, TattoosRepository, TattooLikeRepository, TattooArtistsRepository],
})
export class TattoosModule {}
