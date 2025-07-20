import { TattooBookDatabaseModule } from '@external/database/database.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignInUseCase } from './use-cases/sign-in/sign-in.use-case';

@Module({
  imports: [TattooBookDatabaseModule],
  controllers: [AuthController],
  providers: [SignInUseCase],
})
export class AuthModule {}
