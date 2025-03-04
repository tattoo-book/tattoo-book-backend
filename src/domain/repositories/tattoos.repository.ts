import { BaseRepository } from '@architecture/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TattoosEntity } from '../entities/tattoos.entity';

@Injectable()
export class TattoosRepository extends BaseRepository<TattoosEntity> {
  constructor(@InjectRepository(TattoosEntity) private readonly repository: Repository<TattoosEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
