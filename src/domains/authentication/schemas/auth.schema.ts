import { CommonSchema } from '@tattoo-book-architecture/schemas';

export class AuthSchema {
  static readonly email = CommonSchema.email;
  static readonly password = CommonSchema.password;
}
