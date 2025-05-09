import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosEntity } from '@tattoo-book-architecture';
import { StudiosRepository } from 'src/modules/studios/repositories/studios.repositories';
import { StudiosController } from 'src/modules/studios/studios.controller';
import { StudiosService } from 'src/modules/studios/studios.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudiosEntity])],
  controllers: [StudiosController],
  providers: [StudiosService, StudiosRepository],
})
export class StudiosModule {}
