import { Logger } from '@nestjs/common';
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

  private formatSearch(search) {
    const searchFormatted: FindOptionsWhere<T> = {};

    for (const chave in search) {
      if (search.hasOwnProperty(chave)) {
        const valor = search[chave];
        if (typeof valor === 'string') {
          searchFormatted[chave] = Like(`%${valor.toLowerCase()}%`);
        } else {
          searchFormatted[chave] = valor;
        }
      }
    }

    return searchFormatted;
  }

  async findMany(query: FindManyOptions<T>) {
    Logger.log(`Find many with query: ${JSON.stringify(query)}`);
    const search: FindOptionsWhere<T> = this.formatSearch(query.search);

    const whereFormated = { ...query.filter, ...search };
    return this.find({
      select: query.select,
      take: query.pageSize,
      skip: query.page,
      relations: query.includes,
      where: whereFormated,
    });
  }
}
