import { TattooSchema } from '@tattoos/schemas/tattoo.schema';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

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
