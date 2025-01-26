import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { TattooSchema } from '../schemas/tattoo.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateTatttooDTO {
  @JoiSchema(TattooSchema.title.optional())
  title?: string;

  @JoiSchema(TattooSchema.description.optional())
  description?: string;

  @JoiSchema(TattooSchema.imageName.optional())
  imageName?: string;

  @JoiSchema(TattooSchema.imageLink.optional())
  imageLink?: string;
}
