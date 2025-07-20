import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { TattooSchema } from 'src/domains/tattoos/schemas/tattoo.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateTattooDTO {
  @JoiSchema(TattooSchema.title.optional())
  @ApiProperty({ description: 'Titulo da tatuagem', required: false, type: 'string' })
  title?: string;

  @JoiSchema(TattooSchema.description.optional())
  @ApiProperty({ description: 'Descrição da tatuagem', required: false, type: 'string' })
  description?: string;

  @JoiSchema(TattooSchema.imageLink.optional())
  @ApiProperty({ description: 'Link da imagem', required: false, type: 'string' })
  imageLink?: string;
}
