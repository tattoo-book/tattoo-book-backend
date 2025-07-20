import { Module } from '@nestjs/common';
import { TattooBookDatabaseModule } from 'src/external/database/database.module';
import { TattooController } from './tattoos.controller';
import { CreateTattooUseCase } from './use-cases/CRUD/create/create-tattoo.use-case';
import { DeleteTattooUseCase } from './use-cases/CRUD/delete/delete.use-case';
import { FindManyTattoosUseCase } from './use-cases/CRUD/find-many/find-many.use-case';
import { FindOneTattooUseCase } from './use-cases/CRUD/find-one/find-onse.use-case';
import { UpdateTattooUseCase } from './use-cases/CRUD/update/update-tattoo.use-case';
import { LikeTattooUseCase } from './use-cases/like/like.use-case';
import { UnlikeTattooUseCase } from './use-cases/unlike/unlike.use-case';

@Module({
  imports: [TattooBookDatabaseModule],
  controllers: [TattooController],
  providers: [
    CreateTattooUseCase,
    UpdateTattooUseCase,
    FindManyTattoosUseCase,
    FindOneTattooUseCase,
    DeleteTattooUseCase,
    LikeTattooUseCase,
    UnlikeTattooUseCase,
  ],
})
export class TattoosModule {}
