import { DownloadTattooArtistScheduleUseCase } from '@domains/tattoo-artist/use-cases/download/tattoo-artist.service';
import { FindManyTattoosUseCase } from '@domains/tattoos/use-cases/CRUD/find-many/find-many.use-case';
import { Module } from '@nestjs/common';
import { TattooArtistsController } from 'src/domains/tattoo-artist/tattoo-artist.controller';
import { TattooBookDatabaseModule } from 'src/external/database/database.module';
import { CreateTattooArtistUseCase } from './use-cases/CRUD/create/create.use-case';
import { DeleteTattooArtistUseCase } from './use-cases/CRUD/delete/delete.usecase';
import { FindOneTattooArtistUseCase } from './use-cases/CRUD/find-one/find-one.use-case';
import { UpdateTattooArtistUseCase } from './use-cases/CRUD/update/update.use-case';

@Module({
  imports: [TattooBookDatabaseModule],
  controllers: [TattooArtistsController],
  providers: [
    DownloadTattooArtistScheduleUseCase,
    CreateTattooArtistUseCase,
    UpdateTattooArtistUseCase,
    FindManyTattoosUseCase,
    FindOneTattooArtistUseCase,
    DeleteTattooArtistUseCase,
  ],
})
export class TattooArtistModule {}
