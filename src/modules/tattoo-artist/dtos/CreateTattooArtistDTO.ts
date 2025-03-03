import { JoiSchema } from 'nestjs-joi';
import { TattooArtistsSchema } from 'src/modules/tattoo-artist/schemas/TattooArtistsSchema';

export class CreateTattooArtistDTO {
  @JoiSchema(TattooArtistsSchema.artistName.required())
  name: string;
}
