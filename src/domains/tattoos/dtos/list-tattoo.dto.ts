import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { TattoosEntity } from '../entities/tattoos.entity';
import { TattooSchema } from '../schemas/tattoo.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class ListTattoosDTO {
  @JoiSchema(TattooSchema.order.optional())
  order: FindOptionsOrder<TattoosEntity>;

  @JoiSchema(TattooSchema.where.optional())
  where: FindOptionsWhere<TattoosEntity>;

  @JoiSchema(TattooSchema.select.optional())
  select: FindOptionsSelect<TattoosEntity>;
}
