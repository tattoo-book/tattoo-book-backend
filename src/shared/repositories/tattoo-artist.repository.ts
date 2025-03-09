import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TattooArtistsEntity } from 'src/shared/entities/tattoo-artist.entity';
import { BaseRepository } from 'tattoo-book-architecture/libs/tattoo-book/src';
import { Repository } from 'typeorm';

@Injectable()
export class TattooArtistsRepository extends BaseRepository<TattooArtistsEntity> {
  constructor(@InjectRepository(TattooArtistsEntity) private readonly repository: Repository<TattooArtistsEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
