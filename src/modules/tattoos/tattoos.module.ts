import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsEntity } from 'src/domain/entities/tattoo-artist.entity';
import { TattoosLikesEntity } from 'src/domain/entities/tattoos-likes';
import { TattoosEntity } from 'src/domain/entities/tattoos.entity';
import { TattooLikeRepository } from 'src/domain/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/domain/repositories/tattoos.repository';
import { TattooArtistsRepository } from 'src/modules/tattoo-artist/repositories/tattoo-artist.repository';
import { TattooService } from 'src/modules/tattoos/tattoo.service';
import { TattooController } from 'src/modules/tattoos/tattoos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TattoosEntity, TattoosLikesEntity, TattooArtistsEntity])],
  controllers: [TattooController],
  providers: [TattooService, TattoosRepository, TattooLikeRepository, TattooArtistsRepository],
})
export class TattoosModule {}
