import { CommonSchema } from '@architecture/schemas/CommomSchema';
import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { StudiosEntity } from 'src/domain/entities/studios.entitty';
import { StudiosSchema } from 'src/modules/studios/schemas/studios.schema';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';

@JoiSchemaOptions({ allowUnknown: false })
export class ListStudiosDTO {
  @JoiSchema(StudiosSchema.order.optional())
  @ApiProperty({ description: 'Colunas de ordenação', required: false })
  order?: FindOptionsOrder<StudiosEntity>;

  @JoiSchema(StudiosSchema.filter.optional())
  @ApiProperty({ description: 'Condições para seleção', required: false })
  filter?: FindOptionsWhere<StudiosEntity>;

  @JoiSchema(StudiosSchema.select.optional())
  @ApiProperty({ description: 'Colunas que serão selecionadas', required: false })
  select?: FindOptionsSelect<StudiosEntity>;

  @ApiProperty({ description: 'Número da página', required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: 'Tamanho da página', required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
