import { ApiProperty } from '@nestjs/swagger';
import { UserSchema } from '@users/schemas/user.schema';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

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

  @JoiSchema(UserSchema.artist.required())
  @ApiProperty({ description: 'Define se o usuário é tatuador', type: 'string', required: true })
  artist: boolean;
}
