import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from 'src/architecture/configurations/jwt.config';
import { AuthService } from 'src/domains/authentication/auth.service';
import { StudiosEntity } from 'src/domains/studios/entities/studios.entitty';
import { StudiosRepository } from 'src/domains/studios/repositories/studios.repositories';
import { StudiosController } from 'src/domains/studios/studios.controller';
import { StudiosService } from 'src/domains/studios/studios.service';
import { TattooArtistsEntity } from 'src/domains/tattoo-artist/entities/TattooArtistsEntity';
import { TattooArtistsRepository } from 'src/domains/tattoo-artist/repositories/TattooArtistsRepository';
import { TattooArtistsController } from 'src/domains/tattoo-artist/tattoo-artist.controller';
import { TattooArtistService } from 'src/domains/tattoo-artist/tattoo-artist.service';
import { TattoosEntity } from 'src/domains/tattoos/entities/tattoos.entity';
import { TattoosRepository } from 'src/domains/tattoos/repositories/tattoos.repository';
import { TattooService } from 'src/domains/tattoos/tattoo.service';
import { TattooController } from 'src/domains/tattoos/tattoos.controller';
import { UsersEntity } from 'src/domains/users/entities/user.entity';
import { UserRepository } from 'src/domains/users/repositories/user.repository';
import { UsersController } from 'src/domains/users/user.controller';
import { UsersService } from 'src/domains/users/users.service';
import { AppController } from './app.controller';
import { AuthController } from './domains/authentication/auth.controller';
import { DatabaseConfig } from './infra/database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register(JwtConfig.register()),
    TypeOrmModule.forRoot(DatabaseConfig.connect()),
    TypeOrmModule.forFeature([UsersEntity, TattooArtistsEntity, StudiosEntity, TattoosEntity]),
  ],
  controllers: [AppController, UsersController, AuthController, TattooArtistsController, StudiosController, TattooController],
  providers: [
    UsersService,
    UserRepository,
    AuthService,
    TattooArtistService,
    TattooArtistsRepository,
    StudiosService,
    StudiosRepository,
    TattooService,
    TattoosRepository,
  ],
})
export class AppModule {}
