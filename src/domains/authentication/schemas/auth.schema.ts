import { CommonSchema } from 'src/architecture/schemas/CommomSchema';

export class AuthSchema {
  static email = CommonSchema.email;
  static password = CommonSchema.password;
}
