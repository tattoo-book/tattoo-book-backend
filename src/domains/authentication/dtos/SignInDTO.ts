import { JoiSchema } from 'nestjs-joi';
import { AuthSchema } from '../schemas/auth.schema';

export class SignInDTO {
  @JoiSchema(AuthSchema.email.required())
  email: string;

  @JoiSchema(AuthSchema.password.required())
  password: string;
}
