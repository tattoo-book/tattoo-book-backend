import * as Joi from 'joi';
import { CommonSchema } from '../../../architecture/schemas/CommomSchema';

export class UserSchema {
  static firstName = Joi.string();
  static email = CommonSchema.email;
  static password = CommonSchema.password;
}
