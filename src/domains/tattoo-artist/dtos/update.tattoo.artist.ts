import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { SchedulingDTO } from 'src/architecture/dtos/schedulings/SchedulingDTO';
import { TattooArtistsSchema } from '../schemas/TattooArtistsSchema';

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateTattooArtistDTO {
  @JoiSchema(TattooArtistsSchema.schedulings.optional())
  schedulings: SchedulingDTO;
}
