import { BaseRepository } from '@architecture/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudiosEntity } from 'src/domains/studios/entities/studios.entitty';
import { Repository } from 'typeorm';

@Injectable()
export class StudiosRepository extends BaseRepository<StudiosEntity> {
  constructor(@InjectRepository(StudiosEntity) private readonly repository: Repository<StudiosEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
