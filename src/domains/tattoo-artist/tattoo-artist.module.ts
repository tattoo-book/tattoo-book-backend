import { Module } from '@nestjs/common';
import { TattooArtistsController } from 'src/domains/tattoo-artist/tattoo-artist.controller';
import { TattooArtistService } from 'src/domains/tattoo-artist/tattoo-artist.service';
import { TattooBookDatabaseModule } from 'src/external/database/database.module';

@Module({
  imports: [TattooBookDatabaseModule],
  controllers: [TattooArtistsController],
  providers: [TattooArtistService],
})
export class TattooArtistModule {}
