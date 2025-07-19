import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@tattoo-book-architecture/entities';
import { BaseRepository } from '@tattoo-book-architecture/repositories';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UsersEntity> {
  constructor(@InjectRepository(UsersEntity) private readonly repository: Repository<UsersEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
