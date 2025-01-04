import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/common/configs/DatabaseConfig';
import { JwtConfig } from 'src/common/configs/JwtConfig';
import { AppController } from 'src/controllers/AppController';
import { AuthController } from 'src/controllers/AuthController';
import { StudiosController } from 'src/controllers/StudiosController';
import { TattooArtistsController } from 'src/controllers/TattooArtistsController';
import { UsersController } from 'src/controllers/UsersController';
import { StudiosEntity } from 'src/entities/StudiosSchema';
import { TattooArtistsEntity } from 'src/entities/TattooArtistsEntity';
import { UsersEntity } from 'src/entities/UsersEntity';
import { StudiosRepository } from 'src/repositories/StudiosRepository';
import { TattooArtistsRepository } from 'src/repositories/TattooArtistsRepository';
import { UserRepository } from 'src/repositories/UserRepository';
import { AuthService } from 'src/services/AuthService';
import { StudiosService } from 'src/services/StudiosService';
import { TattooArtistService } from 'src/services/TattooArtistService';
import { UsersService } from 'src/services/UsersService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register(JwtConfig.register()),
    TypeOrmModule.forRoot(DatabaseConfig.get()),
    TypeOrmModule.forFeature([UsersEntity, TattooArtistsEntity, StudiosEntity]),
  ],
  controllers: [AppController, UsersController, AuthController, TattooArtistsController, StudiosController],
  providers: [UsersService, UserRepository, AuthService, TattooArtistService, TattooArtistsRepository, StudiosService, StudiosRepository],
})
export class AppModule {}
