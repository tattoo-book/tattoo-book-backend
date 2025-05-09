import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudiosEntity } from '@tattoo-book-architecture';
import { BaseRepository } from '@tattoo-book-architecture/repositories';
import { Repository } from 'typeorm';

@Injectable()
export class StudiosRepository extends BaseRepository<StudiosEntity> {
  constructor(@InjectRepository(StudiosEntity) private readonly repository: Repository<StudiosEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
