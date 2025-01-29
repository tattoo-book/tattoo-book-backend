import { JwtConfig } from '@architecture/configurations/jwt.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosEntity } from '@studios/entities/studios.entitty';
import { TattooArtistsEntity } from '@tattoo-artist/entities/tattoo-artist.entity';
import { AppController } from './app.controller';
import { AuthGuard } from './architecture/guards/auth.guard';
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
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
