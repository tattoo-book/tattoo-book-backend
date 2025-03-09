import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { TattooSchema } from 'src/domains/tattoos/schemas/tattoo.schema';

@JoiSchemaOptions({ allowUnknown: false })
export class CreateTattooDTO {
  @JoiSchema(TattooSchema.title.required())
  @ApiProperty({ description: 'Titulo da tatuagem', type: 'string', required: true })
  title: string;

  @JoiSchema(TattooSchema.description.required())
  @ApiProperty({ description: 'Descrição da tatuagem', type: 'string', required: true })
  description: string;

  @JoiSchema(TattooSchema.imageLink.required())
  @ApiProperty({ description: 'Link de acesso da tatuagem', type: 'string', required: true })
  imageLink: string;
}
