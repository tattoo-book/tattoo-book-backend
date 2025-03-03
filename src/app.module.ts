import { JwtConfig } from '@architecture/configurations/jwt.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosEntity } from 'src/core/entities/studios.entitty';
import { TattooArtistsEntity } from 'src/core/entities/tattoo-artist.entity';
import { TattoosLikesEntity } from 'src/core/entities/tattoos-likes';
import { AppController } from './app.controller';
import { AuthGuard } from './architecture/guards/auth.guard';
import { DatabaseModule } from './external/database/database.module';
import { AuthModule } from './modules/authentication/auth.module';
import { StudiosModule } from './modules/studios/studios.module';
import { TattooArtistModule } from './modules/tattoo-artist/tattoo-artist.module';
import { TattoosModule } from './modules/tattoos/tattoos.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register(JwtConfig.register()),
    TypeOrmModule.forFeature([TattooArtistsEntity, StudiosEntity, TattoosLikesEntity]),
    DatabaseModule,
    UserModule,
    TattoosModule,
    AuthModule,
    TattooArtistModule,
    StudiosModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
