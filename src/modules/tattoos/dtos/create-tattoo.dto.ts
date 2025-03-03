import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { TattooSchema } from 'src/modules/tattoos/schemas/tattoo.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class CreateTattooDTO {
  @JoiSchema(TattooSchema.title.required())
  title: string;

  @JoiSchema(TattooSchema.description.required())
  description: string;

  @JoiSchema(TattooSchema.imageLink.required())
  imageLink: string;
}
