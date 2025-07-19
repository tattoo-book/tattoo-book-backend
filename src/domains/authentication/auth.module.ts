import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '@tattoo-book-architecture';
import { AuthController } from 'src/domains/authentication/auth.controller';
import { AuthService } from 'src/domains/authentication/auth.service';
import { UserRepository } from '../../@core/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthController],
  providers: [UserRepository, AuthService],
})
export class AuthModule {}
