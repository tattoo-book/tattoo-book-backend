import { JoiSchema } from 'nestjs-joi';
import { TattooArtistsSchema } from 'src/common/joi/schemas/tattoo-artists/TattooArtistsSchema';

export class CreateTattooArtistDTO {
  @JoiSchema(TattooArtistsSchema.artistName.required())
  name: string;
}
