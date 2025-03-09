import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosRepository } from 'src/domains/studios/repositories/studios.repositories';
import { StudiosController } from 'src/domains/studios/studios.controller';
import { StudiosService } from 'src/domains/studios/studios.service';
import { StudiosEntity } from 'src/shared/entities/studios.entitty';

@Module({
  imports: [TypeOrmModule.forFeature([StudiosEntity])],
  controllers: [StudiosController],
  providers: [StudiosService, StudiosRepository],
})
export class StudiosModule {}
