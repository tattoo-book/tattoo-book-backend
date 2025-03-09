import { BaseRepository } from '@architecture/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TattoosLikesEntity } from '../entities/tattoos-likes';

@Injectable()
export class TattooLikeRepository extends BaseRepository<TattoosLikesEntity> {
  constructor(@InjectRepository(TattoosLikesEntity) private readonly repository: Repository<TattoosLikesEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
