import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { UsersEntity } from '../entities/user.entity';
import { UserSchema } from '../schemas/user.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class ListUserDTO {
  @JoiSchema(UserSchema.order.optional())
  order: FindOptionsOrder<UsersEntity>;

  @JoiSchema(UserSchema.where.optional())
  where: FindOptionsWhere<UsersEntity>;

  @JoiSchema(UserSchema.select.optional())
  select: FindOptionsSelect<UsersEntity>;
}
