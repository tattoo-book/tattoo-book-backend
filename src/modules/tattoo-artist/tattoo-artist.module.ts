import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsEntity } from 'src/core/entities/tattoo-artist.entity';
import { TattooArtistsRepository } from 'src/modules/tattoo-artist/repositories/tattoo-artist.repository';
import { TattooArtistsController } from 'src/modules/tattoo-artist/tattoo-artist.controller';
import { TattooArtistService } from 'src/modules/tattoo-artist/tattoo-artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([TattooArtistsEntity])],
  controllers: [TattooArtistsController],
  providers: [TattooArtistService, TattooArtistsRepository],
})
export class TattooArtistModule {}
