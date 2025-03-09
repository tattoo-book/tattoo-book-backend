import { CommonSchema } from 'tattoo-book-architecture/libs/tattoo-book/src';

export class AuthSchema {
  static readonly email = CommonSchema.email;
  static readonly password = CommonSchema.password;
}
