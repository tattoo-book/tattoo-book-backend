import { JoiSchema } from 'nestjs-joi';
import { UserSchema } from 'src/common/joi/schemas/users/UserSchema';

export class CreateUserDTO {
  @JoiSchema(UserSchema.firstName.required())
  name: string;

  @JoiSchema(UserSchema.email.required())
  email: string;

  @JoiSchema(UserSchema.password.required())
  password: string;
}
