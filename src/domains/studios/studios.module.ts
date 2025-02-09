import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosEntity } from '@studios/entities/studios.entitty';
import { StudiosRepository } from '@studios/repositories/studios.repositories';
import { StudiosController } from '@studios/studios.controller';
import { StudiosService } from '@studios/studios.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudiosEntity])],
  controllers: [StudiosController],
  providers: [StudiosService, StudiosRepository],
})
export class StudiosModule {}
