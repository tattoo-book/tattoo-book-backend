import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { StudiosSchema } from 'src/domains/studios/schemas/studios.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateStudioDTO {
  @JoiSchema(StudiosSchema.studioName.optional())
  name: string;
}
