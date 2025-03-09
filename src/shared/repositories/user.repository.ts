import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

import { BaseRepository } from 'tattoo-book-architecture/libs/tattoo-book/src';

@Injectable()
export class UserRepository extends BaseRepository<UsersEntity> {
  constructor(@InjectRepository(UsersEntity) private readonly repository: Repository<UsersEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
