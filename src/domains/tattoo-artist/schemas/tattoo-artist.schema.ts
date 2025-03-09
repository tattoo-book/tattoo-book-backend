import * as Joi from 'joi';
import { SchedulingSchema } from './schedulling.schema';

export class TattooArtistsSchema {
  static readonly artistName = Joi.string().min(1);

  static readonly schedulings = Joi.object({
    sunday: SchedulingSchema.daysWeek.required(),
    monday: SchedulingSchema.daysWeek.required(),
    tuesday: SchedulingSchema.daysWeek.required(),
    wednesday: SchedulingSchema.daysWeek.required(),
    thursday: SchedulingSchema.daysWeek.required(),
    friday: SchedulingSchema.daysWeek.required(),
    saturday: SchedulingSchema.daysWeek.required(),
  });
}
