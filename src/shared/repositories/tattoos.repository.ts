import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TattoosEntity } from '@tattoo-book-architecture';
import { BaseRepository } from '@tattoo-book-architecture/repositories';
import { Repository } from 'typeorm';
@Injectable()
export class TattoosRepository extends BaseRepository<TattoosEntity> {
  constructor(@InjectRepository(TattoosEntity) private readonly repository: Repository<TattoosEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
