import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  static get(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME,
      entities: [],
      logging: true,
      autoLoadEntities: true,
    };
  }
}
