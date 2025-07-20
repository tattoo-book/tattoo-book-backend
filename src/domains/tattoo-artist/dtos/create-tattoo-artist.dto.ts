import { JoiSchema } from 'nestjs-joi';
import { TattooArtistsSchema } from 'src/domains/tattoo-artist/schemas/tattoo-artist.schema';

export class CreateTattooArtistDTO {
  @JoiSchema(TattooArtistsSchema.artistName.required())
  name: string;
}
