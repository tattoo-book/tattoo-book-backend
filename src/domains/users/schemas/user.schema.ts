import * as Joi from 'joi';
import { CommonSchema } from '../../../architecture/schemas/CommomSchema';
export class UserSchema {
  static firstName = CommonSchema.text;
  static email = CommonSchema.email;
  static password = CommonSchema.password;

  static order = Joi.object({
    email: CommonSchema.order,
    createdAt: CommonSchema.order,
  });

  static where = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
  });

  static select = Joi.object({});
}
