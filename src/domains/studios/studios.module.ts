import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosEntity } from './entities/studios.entitty';
import { StudiosRepository } from './repositories/studios.repositories';
import { StudiosController } from './studios.controller';
import { StudiosService } from './studios.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudiosEntity])],
  controllers: [StudiosController],
  providers: [StudiosService, StudiosRepository],
})
export class StudiosModule {}
