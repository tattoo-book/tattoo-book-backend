import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TattoosLikesEntity } from '@tattoo-book-architecture';
import { BaseRepository } from '@tattoo-book-architecture/repositories';
import { Repository } from 'typeorm';

@Injectable()
export class TattooLikeRepository extends BaseRepository<TattoosLikesEntity> {
  constructor(@InjectRepository(TattoosLikesEntity) private readonly repository: Repository<TattoosLikesEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
