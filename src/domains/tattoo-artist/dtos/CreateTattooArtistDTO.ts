import { TattooArtistsSchema } from '@tattoo-artist/schemas/tattoo-artist.schema';
import { JoiSchema } from 'nestjs-joi';

export class CreateTattooArtistDTO {
  @JoiSchema(TattooArtistsSchema.artistName.required())
  name: string;
}
