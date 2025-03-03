import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { TattoosEntity } from 'src/core/entities/tattoos.entity';
import { TattooSchema } from 'src/modules/tattoos/schemas/tattoo.schema';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';

@JoiSchemaOptions({ allowUnknown: false })
export class ListTattoosDTO {
  @JoiSchema(TattooSchema.order.optional())
  @ApiProperty({ description: 'Campos que podem ser ordenados', type: () => TattoosEntity })
  order?: FindOptionsOrder<TattoosEntity>;

  @JoiSchema(TattooSchema.filter.optional())
  @ApiProperty({ description: 'Campos que podem ser filtrados', type: () => TattoosEntity })
  filter?: FindOptionsWhere<TattoosEntity>;

  @JoiSchema(TattooSchema.search.optional())
  @ApiProperty({ description: 'Campos do pesquisa com like', type: () => TattoosEntity })
  search?: FindOptionsWhere<TattoosEntity>;

  @JoiSchema(TattooSchema.select.optional())
  @ApiProperty({ description: 'Campos para selecionar', type: () => TattoosEntity })
  select?: FindOptionsSelect<TattoosEntity>;

  @JoiSchema(TattooSchema.includes.optional())
  @ApiProperty({ description: 'Relacionamentos a serem adicionados', type: () => TattoosEntity })
  includes: string[];

  @JoiSchema(TattooSchema.pageSize.optional())
  @ApiProperty({ description: 'Tamanho da página', type: () => TattoosEntity })
  pageSize?: number;
}
