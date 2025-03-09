import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsRepository } from 'src/domains/tattoo-artist/repositories/tattoo-artist.repository';
import { TattooService } from 'src/domains/tattoos/tattoo.service';
import { TattooController } from 'src/domains/tattoos/tattoos.controller';
import { TattooArtistsEntity } from 'src/shared/entities/tattoo-artist.entity';
import { TattoosLikesEntity } from 'src/shared/entities/tattoos-likes';
import { TattoosEntity } from 'src/shared/entities/tattoos.entity';
import { TattooLikeRepository } from 'src/shared/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/shared/repositories/tattoos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TattoosEntity, TattoosLikesEntity, TattooArtistsEntity])],
  controllers: [TattooController],
  providers: [TattooService, TattoosRepository, TattooLikeRepository, TattooArtistsRepository],
})
export class TattoosModule {}
