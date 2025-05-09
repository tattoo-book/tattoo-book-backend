import { SchedulingSchema } from '@tattoo-artist/schemas/schedulling.schema';
import { JoiSchema } from 'nestjs-joi';

export class SchedulingTimes {
  @JoiSchema(SchedulingSchema.start.required())
  start: string;

  @JoiSchema(SchedulingSchema.end.required())
  end: string;
}
