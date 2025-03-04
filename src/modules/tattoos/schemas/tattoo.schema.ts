import * as Joi from 'joi';

export class TattooSchema {
  static readonly id = Joi.number().integer().positive();
  static readonly tattooArtistId = Joi.number().integer().positive();
  static readonly title = Joi.string().max(50);
  static readonly description = Joi.string().max(200);
  static readonly imageName = Joi.string().max(255);
  static readonly imageLink = Joi.string().uri();
  static readonly orderValuesValid = Joi.string().valid('asc', 'desc');

  static readonly pageSize = Joi.number().integer().positive();

  static readonly order = Joi.object({
    id: this.orderValuesValid,
    popularity: this.orderValuesValid,
  });

  static readonly filter = Joi.object({
    id: this.id,
    title: Joi.string(),
    description: Joi.string(),
    imageName: Joi.string(),
    tattooArtistId: this.tattooArtistId,
  });

  static readonly search = Joi.object({
    id: this.id,
    title: Joi.string(),
    description: Joi.string(),
    imageName: Joi.string(),
    searchValues: Joi.string(),
    tattooArtistId: this.tattooArtistId,
  });

  static readonly includes = Joi.array().items(Joi.string());

  static readonly select = Joi.object({
    id: Joi.boolean(),
    title: Joi.boolean(),
    description: Joi.boolean(),
    imageName: Joi.boolean(),
    imageLink: Joi.boolean(),
    tattooArtistId: Joi.boolean(),
  });
}
