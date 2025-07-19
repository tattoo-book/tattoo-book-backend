import * as Joi from 'joi';

export class Envs {
  static str = Joi.string().trim().min(1).required();

  static validationSchema = Joi.object({
    DB_HOST: Envs.str.example('localhost'),
    DB_PORT: Joi.number().required(),
    DB_USER: Envs.str,
    DB_PASSWORD: Envs.str,
    DB_NAME: Envs.str,
    JWT_SECRET: Envs.str,
    POSTGRES_DB: Envs.str,
    POSTGRES_USER: Envs.str,
    POSTGRES_PASSWORD: Envs.str,
    RMQ_HOST: Envs.str.example('localhost'),
    RMQ_PORT: Envs.str,
    RMQ_USER: Envs.str,
    RMQ_PASSWORD: Envs.str,
    RMQ_TATTOOS_QUEUE: Envs.str.example('RMQ_TATTOOS_QUEUE'),
    RMQ_EMAILS_QUEUE: Envs.str.example('RMQ_EMAILS_QUEUE'),
  });
}
