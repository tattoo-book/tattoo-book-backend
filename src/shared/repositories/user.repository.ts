import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@tattoo-book-architecture/repositories';
import { UsersEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UsersEntity> {
  constructor(@InjectRepository(UsersEntity) private readonly repository: Repository<UsersEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
