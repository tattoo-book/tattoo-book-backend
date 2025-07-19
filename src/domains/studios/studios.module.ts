import { TattooBookDatabaseModule } from '@external/database/database.module';
import { Module } from '@nestjs/common';
import { StudiosController } from 'src/domains/studios/studios.controller';
import { StudiosService } from 'src/domains/studios/studios.service';

@Module({
  imports: [TattooBookDatabaseModule],
  controllers: [StudiosController],
  providers: [StudiosService],
})
export class StudiosModule {}
