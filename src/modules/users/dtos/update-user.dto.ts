import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { UserSchema } from '../schemas/user.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateUserDto {
  @JoiSchema(UserSchema.firstName.optional())
  @ApiProperty({ description: 'Nome do usuário', type: 'string' })
  name: string;
}
