import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsRepository } from '@tattoo-artist/repositories/tattoo-artist.repository';
import { TattooArtistsController } from '@tattoo-artist/tattoo-artist.controller';
import { TattooArtistService } from '@tattoo-artist/tattoo-artist.service';
import { TattooArtistsEntity } from 'src/core/entities/tattoo-artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TattooArtistsEntity])],
  controllers: [TattooArtistsController],
  providers: [TattooArtistService, TattooArtistsRepository],
})
export class TattooArtistModule {}
