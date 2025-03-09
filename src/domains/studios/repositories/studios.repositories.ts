import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudiosEntity } from 'src/shared/entities/studios.entitty';
import { BaseRepository } from 'tattoo-book-architecture/libs/tattoo-book/src';
import { Repository } from 'typeorm';

@Injectable()
export class StudiosRepository extends BaseRepository<StudiosEntity> {
  constructor(@InjectRepository(StudiosEntity) private readonly repository: Repository<StudiosEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
