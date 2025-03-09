import { SchedulingDTO } from '@architecture/dtos/schedulings/SchedulingDTO';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { TattooArtistsSchema } from '../schemas/TattooArtistsSchema';

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateTattooArtistDTO {
  @JoiSchema(TattooArtistsSchema.schedulings.optional())
  schedulings: SchedulingDTO;
}
