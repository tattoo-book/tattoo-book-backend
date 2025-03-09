import { JoiSchema } from 'nestjs-joi';
import { SchedulingSchema } from '../schemas/schedulling.schema';

export class SchedulingTimes {
  @JoiSchema(SchedulingSchema.start.required())
  start: string;

  @JoiSchema(SchedulingSchema.end.required())
  end: string;
}
