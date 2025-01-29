import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { CommonSchema } from 'src/architecture/schemas/CommomSchema';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { UsersEntity } from '../entities/user.entity';
import { UserSchema } from '../schemas/user.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class ListUserDTO {
  @JoiSchema(UserSchema.order.optional())
  @ApiProperty({ description: 'Colunas de ordenação', required: false })
  order?: FindOptionsOrder<UsersEntity>;

  @JoiSchema(UserSchema.filter.optional())
  @ApiProperty({ description: 'Condições para seleção', required: false })
  filter?: FindOptionsWhere<UsersEntity>;

  @JoiSchema(UserSchema.select.optional())
  @ApiProperty({ description: 'Colunas que serão selecionadas', required: false })
  select?: FindOptionsSelect<UsersEntity>;

  @ApiProperty({ description: 'Número da página', required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: 'Tamanho da página', required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
