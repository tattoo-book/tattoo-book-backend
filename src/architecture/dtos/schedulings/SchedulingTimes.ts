import { JoiSchema } from 'nestjs-joi';
import { SchedulingSchema } from 'src/architecture/schemas/schedulings/SchedulingSchema';

export class SchedulingTimes {
  @JoiSchema(SchedulingSchema.start.required())
  start: string;

  @JoiSchema(SchedulingSchema.end.required())
  end: string;
}
