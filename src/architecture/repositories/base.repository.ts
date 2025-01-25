import { NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
  constructor(target, manager, queryRunner) {
    super(target, manager, queryRunner);
  }

  async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    const entity = await this.findOne(options);
    if (!entity) throw new NotFoundException('Entity not found');
    return entity;
  }
}
