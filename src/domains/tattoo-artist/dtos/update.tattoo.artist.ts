import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { TattooArtistsSchema } from '../schemas/tattoo-artist.schema';
import { SchedulingDTO } from './scheduling.dto';

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateTattooArtistDTO {
  @JoiSchema(TattooArtistsSchema.schedulings.optional())
  schedulings: SchedulingDTO;
}
