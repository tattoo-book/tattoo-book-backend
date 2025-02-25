import * as Joi from 'joi';

export class TattooSchema {
  static id = Joi.number().integer().positive();
  static tattooArtistId = Joi.number().integer().positive();
  static title = Joi.string().max(50);
  static description = Joi.string().max(200);
  static imageName = Joi.string().max(255);
  static imageLink = Joi.string().uri();
  static orderValuesValid = Joi.string().valid('asc', 'desc');

  static pageSize = Joi.number().integer().positive();

  static order = Joi.object({
    id: this.orderValuesValid,
    popularity: this.orderValuesValid,
  });

  static filter = Joi.object({
    id: this.id,
    title: Joi.string(),
    description: Joi.string(),
    imageName: Joi.string(),
    tattooArtistId: this.tattooArtistId,
  });

  static search = Joi.object({
    id: this.id,
    title: Joi.string(),
    description: Joi.string(),
    imageName: Joi.string(),
    searchValues: Joi.string(),
    tattooArtistId: this.tattooArtistId,
  });

  static includes = Joi.array().items(Joi.string());

  static select = Joi.object({
    id: Joi.boolean(),
    title: Joi.boolean(),
    description: Joi.boolean(),
    imageName: Joi.boolean(),
    imageLink: Joi.boolean(),
    tattooArtistId: Joi.boolean(),
  });
}
