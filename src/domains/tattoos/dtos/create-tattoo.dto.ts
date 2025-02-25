import { TattooSchema } from '@tattoos/schemas/tattoo.schema';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({ allowUnknown: false })
export class CreateTattooDTO {
  @JoiSchema(TattooSchema.title.required())
  title: string;

  @JoiSchema(TattooSchema.description.required())
  description: string;

  @JoiSchema(TattooSchema.imageLink.required())
  imageLink: string;
}
