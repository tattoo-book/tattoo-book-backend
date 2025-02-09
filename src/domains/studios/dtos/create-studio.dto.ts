import { StudiosSchema } from '@studios/schemas/studios.schema';
import { JoiSchema } from 'nestjs-joi';

export class CreateStudioDTO {
  @JoiSchema(StudiosSchema.studioName.required())
  name: string;
}
