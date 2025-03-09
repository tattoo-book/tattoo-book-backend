import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from '@tattoo-book-architecture/configurations';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { AppController } from './app.controller';
import { AuthModule } from './domains/authentication/auth.module';
import { EmailModule } from './domains/email/email.module';
import { StudiosModule } from './domains/studios/studios.module';
import { TattooArtistModule } from './domains/tattoo-artist/tattoo-artist.module';
import { TattoosModule } from './domains/tattoos/tattoos.module';
import { UserModule } from './domains/users/user.module';
import { DatabaseModule } from './external/database/database.module';
import { RabbitmqModule } from './external/rabbitmq/rabbitmq.module';
import { StudiosEntity } from './shared/entities/studios.entitty';
import { TattooArtistsEntity } from './shared/entities/tattoo-artist.entity';
import { TattoosLikesEntity } from './shared/entities/tattoos-likes';

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
    RabbitmqModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
