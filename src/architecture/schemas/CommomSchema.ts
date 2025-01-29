import * as Joi from 'joi';

export class CommonSchema {
  static text = Joi.string().min(1).trim();
  static email = Joi.string().email().min(1).max(250);
  static password = Joi.string().min(1);
  static order = Joi.string().valid('asc', 'desc');
  static page = Joi.number().positive();
  static pageSize = Joi.number().positive();
}
