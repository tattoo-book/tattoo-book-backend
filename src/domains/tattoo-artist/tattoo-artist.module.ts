import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooArtistsRepository } from 'src/domains/tattoo-artist/repositories/tattoo-artist.repository';
import { TattooArtistsController } from 'src/domains/tattoo-artist/tattoo-artist.controller';
import { TattooArtistService } from 'src/domains/tattoo-artist/tattoo-artist.service';
import { TattooArtistsEntity } from 'src/shared/entities/tattoo-artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TattooArtistsEntity])],
  controllers: [TattooArtistsController],
  providers: [TattooArtistService, TattooArtistsRepository],
})
export class TattooArtistModule {}
