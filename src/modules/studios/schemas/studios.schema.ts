import { CommonSchema } from '@tattoo-book-architecture/schemas';
import * as Joi from 'joi';

export class StudiosSchema {
  static readonly studioName = Joi.string().min(1);

  static readonly order = Joi.object({
    name: CommonSchema.order,
    createdAt: CommonSchema.order,
  });

  static readonly filter = Joi.object({
    id: Joi.number().positive(),
    name: Joi.string(),
  });

  static readonly select = Joi.object({});
}
