import * as Joi from 'joi';

export class CommonSchema {
  static readonly text = Joi.string().min(1).trim();
  static readonly email = Joi.string().email().min(1).max(250);
  static readonly password = Joi.string().min(1);
  static readonly order = Joi.string().valid('asc', 'desc');
  static readonly page = Joi.number().positive();
  static readonly pageSize = Joi.number().positive();
}
