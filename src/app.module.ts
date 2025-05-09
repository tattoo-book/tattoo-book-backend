import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '@tattoo-book-architecture/configurations';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { AppController } from './app.controller';
import { TattooBookDatabaseModule } from './external/database/database.module';
import { AuthModule } from './modules/authentication/auth.module';
import { EmailModule } from './modules/email/email.module';
import { StudiosModule } from './modules/studios/studios.module';
import { TattooArtistModule } from './modules/tattoo-artist/tattoo-artist.module';
import { TattoosModule } from './modules/tattoos/tattoos.module';
import { UserModule } from './modules/users/user.module';
import { Envs } from './shared/envs/envs';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: Envs.validationSchema }),
    JwtModule.register(JwtConfig.register()),
    TattooBookDatabaseModule,
    UserModule,
    TattoosModule,
    AuthModule,
    TattooArtistModule,
    StudiosModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
