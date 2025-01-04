import { JoiSchema } from 'nestjs-joi';
import { SchedulingSchema } from 'src/common/joi/schemas/schedulings/SchedulingSchema';

export class SchedulingTimes {
  @JoiSchema(SchedulingSchema.start.required())
  start: string;

  @JoiSchema(SchedulingSchema.end.required())
  end: string;
}
