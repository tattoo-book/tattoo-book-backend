import { TattooArtistsSchema } from '@tattoo-artist/schemas/TattooArtistsSchema';
import { JoiSchema } from 'nestjs-joi';

export class CreateTattooArtistDTO {
  @JoiSchema(TattooArtistsSchema.artistName.required())
  name: string;
}
