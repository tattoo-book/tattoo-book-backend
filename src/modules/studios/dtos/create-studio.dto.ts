import { JoiSchema } from 'nestjs-joi';
import { StudiosSchema } from 'src/modules/studios/schemas/studios.schema';

export class CreateStudioDTO {
  @JoiSchema(StudiosSchema.studioName.required())
  name: string;
}
