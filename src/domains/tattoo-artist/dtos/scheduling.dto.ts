import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { SchedulingSchema } from 'src/domains/tattoo-artist/schemas/schedulling.schema';
import { SchedulingTimes } from './scheduling-times.dto';

@JoiSchemaOptions({ allowUnknown: false })
export class SchedulingDTO {
  @JoiSchema(SchedulingSchema.daysWeek.required())
  sunday: SchedulingTimes[];

  @JoiSchema(SchedulingSchema.daysWeek.required())
  monday: SchedulingTimes[];

  @JoiSchema(SchedulingSchema.daysWeek.required())
  tuesday: SchedulingTimes[];

  @JoiSchema(SchedulingSchema.daysWeek.required())
  wednesday: SchedulingTimes[];

  @JoiSchema(SchedulingSchema.daysWeek.required())
  thursday: SchedulingTimes[];

  @JoiSchema(SchedulingSchema.daysWeek.required())
  friday: SchedulingTimes[];

  @JoiSchema(SchedulingSchema.daysWeek.required())
  saturday: SchedulingTimes[];
}
