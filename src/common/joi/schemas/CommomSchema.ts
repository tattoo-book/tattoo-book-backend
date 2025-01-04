import * as Joi from 'joi';

export class CommonSchema {
  static email = Joi.string().email().min(1).max(250);
  static password = Joi.string().min(1);
}
