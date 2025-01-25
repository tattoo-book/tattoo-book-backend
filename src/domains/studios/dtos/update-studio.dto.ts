import { JoiSchema } from 'nestjs-joi';
import { StudiosSchema } from '../schemas/studios.schema';

export class UpdateStudioDTO {
  @JoiSchema(StudiosSchema.studioName.optional())
  name: string;
}
