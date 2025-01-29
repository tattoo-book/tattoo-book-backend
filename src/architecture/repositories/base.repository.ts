import { FindOptionsSelect, FindOptionsSelectByString, FindOptionsWhere, Repository } from 'typeorm';

type FindManyOptions<T> = {
  filter?: FindOptionsWhere<T>[] | FindOptionsWhere<T>;
  includes?: string[];
  select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>;
  page?: number;
  pageSize?: number;
};
export class BaseRepository<T> extends Repository<T> {
  constructor(target, manager, queryRunner) {
    super(target, manager, queryRunner);
  }

  async findMany(query: FindManyOptions<T>) {
    return this.find({
      select: query.select,
      take: query.pageSize,
      skip: query.page,
      relations: query.includes,
      where: query.filter,
    });
  }
}
