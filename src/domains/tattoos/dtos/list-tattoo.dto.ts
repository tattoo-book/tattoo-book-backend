import { TattoosEntity } from '@tattoos/entities/tattoos.entity';
import { TattooSchema } from '@tattoos/schemas/tattoo.schema';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';

@JoiSchemaOptions({ allowUnknown: false })
export class ListTattoosDTO {
  @JoiSchema(TattooSchema.order.optional())
  order?: FindOptionsOrder<TattoosEntity>;

  @JoiSchema(TattooSchema.where.optional())
  where?: FindOptionsWhere<TattoosEntity>;

  @JoiSchema(TattooSchema.select.optional())
  select?: FindOptionsSelect<TattoosEntity>;

  @JoiSchema(TattooSchema.take.optional())
  take?: number;
}
