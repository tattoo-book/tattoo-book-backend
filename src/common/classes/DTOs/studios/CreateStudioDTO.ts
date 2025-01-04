import { JoiSchema } from 'nestjs-joi';
import { StudiosSchema } from 'src/common/joi/schemas/studios/StudiosSchema';

export class CreateStudioDTO {
  @JoiSchema(StudiosSchema.studioName.required())
  name: string;
}
