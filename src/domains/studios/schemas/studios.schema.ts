import * as Joi from 'joi';

export class StudiosSchema {
  static studioName = Joi.string().min(1);
}
