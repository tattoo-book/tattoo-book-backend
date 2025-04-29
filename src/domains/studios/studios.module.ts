import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosEntity } from '@tattoo-book-architecture';
import { StudiosRepository } from 'src/domains/studios/repositories/studios.repositories';
import { StudiosController } from 'src/domains/studios/studios.controller';
import { StudiosService } from 'src/domains/studios/studios.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudiosEntity])],
  controllers: [StudiosController],
  providers: [StudiosService, StudiosRepository],
})
export class StudiosModule {}
