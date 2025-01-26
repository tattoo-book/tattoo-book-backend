import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { UserSchema } from 'src/domains/users/schemas/user.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class CreateUserDTO {
  @JoiSchema(UserSchema.firstName.required())
  @ApiProperty({ description: 'Nome do usuário', type: 'string', required: true })
  name: string;

  @JoiSchema(UserSchema.email.required())
  @ApiProperty({ description: 'Email do usuário', type: 'string', required: true })
  email: string;

  @JoiSchema(UserSchema.password.required())
  @ApiProperty({ description: 'Senha do usuário', type: 'string', required: true })
  password: string;
}
