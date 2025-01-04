import { JoiSchema } from 'nestjs-joi';
import { AuthSchema } from 'src/common/joi/schemas/auth/AuthConsumer';

export class SignInDTO {
  @JoiSchema(AuthSchema.email.required())
  email: string;

  @JoiSchema(AuthSchema.password.required())
  password: string;
}
