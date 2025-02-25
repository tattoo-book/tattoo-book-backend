import { BaseRepository } from '@architecture/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TattoosLikesEntity } from 'src/core/entities/tattoos-likes';
import { Repository } from 'typeorm';

@Injectable()
export class TattooLikeRepository extends BaseRepository<TattoosLikesEntity> {
  constructor(@InjectRepository(TattoosLikesEntity) private readonly repository: Repository<TattoosLikesEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
