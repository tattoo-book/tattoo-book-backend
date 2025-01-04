import * as Joi from 'joi';

export class TattooArtistsSchema {
  static artistName = Joi.string().min(1);
}
