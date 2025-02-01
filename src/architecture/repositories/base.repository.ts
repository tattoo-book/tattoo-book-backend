import { FindOptionsSelect, FindOptionsSelectByString, FindOptionsWhere, Like, Repository } from 'typeorm';

type FindManyOptions<T> = {
  search?: FindOptionsWhere<T>[] | FindOptionsWhere<T>;
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
    const search: FindOptionsWhere<T> = {};

    for (const chave in query.search) {
      if (query.search.hasOwnProperty(chave)) {
        const valor = query.search[chave];
        if (typeof valor === 'string') {
          search[chave] = Like(`%${valor}%`);
        } else {
          search[chave] = valor;
        }
      }
    }
    return this.find({
      select: query.select,
      take: query.pageSize,
      skip: query.page,
      relations: query.includes,
      // where: { ...query.filter, ...search },
      where: { ...query.filter, ...search },
    });
  }
}
