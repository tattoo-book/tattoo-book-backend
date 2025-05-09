import { Module } from '@nestjs/common';
import { TattooBookDatabaseModule } from 'src/external/database/database.module';
import { TattooArtistsController } from 'src/modules/tattoo-artist/tattoo-artist.controller';
import { TattooArtistService } from 'src/modules/tattoo-artist/tattoo-artist.service';

@Module({
  imports: [TattooBookDatabaseModule],
  controllers: [TattooArtistsController],
  providers: [TattooArtistService],
})
export class TattooArtistModule {}
