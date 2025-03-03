import { BaseRepository } from '@architecture/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UsersEntity> {
  constructor(@InjectRepository(UsersEntity) private readonly repository: Repository<UsersEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
