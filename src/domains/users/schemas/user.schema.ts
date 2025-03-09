import * as Joi from 'joi';
import { CommonSchema } from 'tattoo-book-architecture/libs/tattoo-book/src';
export class UserSchema {
  static readonly firstName = CommonSchema.text;
  static readonly email = CommonSchema.email;
  static readonly password = CommonSchema.password;
  static readonly artist = Joi.boolean();

  static readonly order = Joi.object({
    email: CommonSchema.order,
    createdAt: CommonSchema.order,
  });

  static readonly filter = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
  });

  static readonly select = Joi.object({});
}
