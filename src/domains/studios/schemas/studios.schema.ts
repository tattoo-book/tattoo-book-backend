import * as Joi from 'joi';
import { CommonSchema } from 'src/architecture/schemas/CommomSchema';

export class StudiosSchema {
  static studioName = Joi.string().min(1);

  static order = Joi.object({
    name: CommonSchema.order,
    createdAt: CommonSchema.order,
  });

  static filter = Joi.object({
    id: Joi.number().positive(),
    name: Joi.string(),
  });

  static select = Joi.object({});
}
