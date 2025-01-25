import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsEntity } from './entities/TattooArtistsEntity';
import { TattooArtistsRepository } from './repositories/TattooArtistsRepository';
import { TattooArtistsController } from './tattoo-artist.controller';
import { TattooArtistService } from './tattoo-artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([TattooArtistsEntity])],
  controllers: [TattooArtistsController],
  providers: [TattooArtistService, TattooArtistsRepository],
})
export class TattooArtistModule {}
