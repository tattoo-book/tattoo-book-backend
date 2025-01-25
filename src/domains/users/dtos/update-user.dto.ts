import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { UserSchema } from '../schemas/user.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateUserDto {
  @JoiSchema(UserSchema.firstName.optional())
  name: string;
}
