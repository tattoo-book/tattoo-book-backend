import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import { AuthSchema } from '../schemas/auth.schema';

export class SignInDTO {
  @JoiSchema(AuthSchema.email.required())
  @ApiProperty({ description: 'Email cadastrado pelo usuário', type: 'string', required: true })
  email: string;

  @ApiProperty({ description: 'Senha cadastrada', type: 'string', required: true })
  @JoiSchema(AuthSchema.password.required())
  password: string;
}
