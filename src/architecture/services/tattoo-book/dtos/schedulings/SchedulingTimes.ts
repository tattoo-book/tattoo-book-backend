import { SchedulingSchema } from '@architecture/services/tattoo-book/schemas/schedulings/SchedulingSchema';
import { JoiSchema } from 'nestjs-joi';

export class SchedulingTimes {
  @JoiSchema(SchedulingSchema.start.required())
  start: string;

  @JoiSchema(SchedulingSchema.end.required())
  end: string;
}
