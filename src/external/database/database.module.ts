import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({ imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(DatabaseModule.connect())] })
export class DatabaseModule {
  static connect(): TypeOrmModuleOptions {
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
