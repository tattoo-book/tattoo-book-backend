import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from 'src/architecture/configurations/jwt.config';
import { StudiosEntity } from 'src/domains/studios/entities/studios.entitty';
import { TattooArtistsEntity } from 'src/domains/tattoo-artist/entities/TattooArtistsEntity';
import { AppController } from './app.controller';
import { AuthModule } from './domains/authentication/auth.module';
import { StudiosModule } from './domains/studios/studios.module';
import { TattooArtistModule } from './domains/tattoo-artist/tattoo-artist.module';
import { TattoosModule } from './domains/tattoos/tattoos.module';
import { UserModule } from './domains/users/user.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register(JwtConfig.register()),
    TypeOrmModule.forFeature([TattooArtistsEntity, StudiosEntity]),
    DatabaseModule,
    UserModule,
    TattoosModule,
    AuthModule,
    TattooArtistModule,
    StudiosModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
