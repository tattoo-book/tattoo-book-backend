import * as Joi from 'joi';
import { CommonSchema } from '../CommomSchema';

export class UserSchema {
  static firstName = Joi.string();
  static email = CommonSchema.email;
  static password = CommonSchema.password;
}
