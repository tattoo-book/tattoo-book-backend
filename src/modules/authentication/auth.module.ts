import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '@tattoo-book-architecture';
import { AuthController } from 'src/modules/authentication/auth.controller';
import { AuthService } from 'src/modules/authentication/auth.service';
import { UserRepository } from '../../shared/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthController],
  providers: [UserRepository, AuthService],
})
export class AuthModule {}
