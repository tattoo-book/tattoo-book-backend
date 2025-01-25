import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/architecture/repositories/base.repository';
import { TattoosEntity } from 'src/domains/tattoos/entities/tattoos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TattoosRepository extends BaseRepository<TattoosEntity> {
  constructor(@InjectRepository(TattoosEntity) private readonly repository: Repository<TattoosEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
