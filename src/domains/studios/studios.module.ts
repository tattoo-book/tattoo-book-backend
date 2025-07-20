import { TattooBookDatabaseModule } from '@external/database/database.module';
import { Module } from '@nestjs/common';
import { StudiosController } from 'src/domains/studios/studios.controller';
import { CreateStudioUseCase } from './use-cases/CRUD/create/create.use-case';
import { DeleteStudioUseCase } from './use-cases/CRUD/delete/delete.use-case';
import { FindAllStudioUseCase } from './use-cases/CRUD/find-many/find-many.use-case';
import { FindOneStudioUseCase } from './use-cases/CRUD/find-one/find-one.use-case';
import { UpdateStudioUseCase } from './use-cases/CRUD/update/update.use-case';

@Module({
  imports: [TattooBookDatabaseModule],
  controllers: [StudiosController],
  providers: [
    CreateStudioUseCase,
    FindAllStudioUseCase,
    FindOneStudioUseCase,
    UpdateStudioUseCase,
    DeleteStudioUseCase,
  ],
})
export class StudiosModule {}
