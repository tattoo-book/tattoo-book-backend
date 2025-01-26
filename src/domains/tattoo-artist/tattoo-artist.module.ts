import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsEntity } from './entities/tattoo-artist.entity';
import { TattooArtistsRepository } from './repositories/tattoo-artist.repository';
import { TattooArtistsController } from './tattoo-artist.controller';
import { TattooArtistService } from './tattoo-artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([TattooArtistsEntity])],
  controllers: [TattooArtistsController],
  providers: [TattooArtistService, TattooArtistsRepository],
})
export class TattooArtistModule {}
