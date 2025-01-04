import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/common/configs/DatabaseConfig';
import { JwtConfig } from 'src/common/configs/JwtConfig';
import { AppController } from 'src/controllers/AppController';
import { AuthController } from 'src/controllers/AuthController';
import { TattooArtistsController } from 'src/controllers/TattooArtistsController';
import { UsersController } from 'src/controllers/UsersController';
import { TattooArtistsEntity } from 'src/entities/TattooArtistsEntity';
import { UsersEntity } from 'src/entities/UsersEntity';
import { TattooArtistsRepository } from 'src/repositories/TattooArtistsRepository';
import { UserRepository } from 'src/repositories/UserRepository';
import { AuthService } from 'src/services/AuthService';
import { TattooArtistService } from 'src/services/TattooArtistService';
import { UsersService } from 'src/services/UsersService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register(JwtConfig.register()),
    TypeOrmModule.forRoot(DatabaseConfig.get()),
    TypeOrmModule.forFeature([UsersEntity, TattooArtistsEntity]),
  ],
  // controllers: [ BarberShopsController],
  // providers: [  BarberShopsService, BarberShopsRepository],
  controllers: [AppController, UsersController, AuthController, TattooArtistsController],
  providers: [UsersService, UserRepository, AuthService, TattooArtistService, TattooArtistsRepository],
})
export class AppModule {}
