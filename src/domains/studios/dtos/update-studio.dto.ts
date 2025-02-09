import { StudiosSchema } from '@studios/schemas/studios.schema';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateStudioDTO {
  @JoiSchema(StudiosSchema.studioName.optional())
  name: string;
}
