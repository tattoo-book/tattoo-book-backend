import { ApiProperty } from '@nestjs/swagger';
import { JoiSchemaOptions } from 'nestjs-joi';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';

@JoiSchemaOptions({ allowUnknown: false })
export class QueryParamsPaginated<T> {
  @ApiProperty({ description: 'Colunas de ordenação', required: false })
  order?: FindOptionsOrder<T>;

  @ApiProperty({ description: 'Condições para seleção', required: false })
  filter?: FindOptionsWhere<T>;

  @ApiProperty({ description: 'Colunas que serão selecionadas', required: false })
  select?: FindOptionsSelect<T>;

  @ApiProperty({ description: 'Relacionamentos a serem selecionados', required: false })
  includes: string[];

  @ApiProperty({ description: 'Número da página', required: false })
  page?: number;

  @ApiProperty({ description: 'Tamanho da página', required: false })
  pageSize?: number;
}
