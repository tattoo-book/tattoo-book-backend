import { SchedulingSchema } from '@architecture/schemas/schedulings/SchedulingSchema';
import * as Joi from 'joi';

export class TattooArtistsSchema {
  static artistName = Joi.string().min(1);

  static schedulings = Joi.object({
    sunday: SchedulingSchema.daysWeek.required(),
    monday: SchedulingSchema.daysWeek.required(),
    tuesday: SchedulingSchema.daysWeek.required(),
    wednesday: SchedulingSchema.daysWeek.required(),
    thursday: SchedulingSchema.daysWeek.required(),
    friday: SchedulingSchema.daysWeek.required(),
    saturday: SchedulingSchema.daysWeek.required(),
  });
}
