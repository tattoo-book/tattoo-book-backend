import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '@tattoo-book-architecture/configurations';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { AppController } from './app.controller';
import { AuthModule } from './domains/authentication/auth.module';
import { EmailModule } from './domains/email/email.module';
import { StudiosModule } from './domains/studios/studios.module';
import { TattooArtistModule } from './domains/tattoo-artist/tattoo-artist.module';
import { TattoosModule } from './domains/tattoos/tattoos.module';
import { UserModule } from './domains/users/user.module';
import { TattooBookDatabaseModule } from './external/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
