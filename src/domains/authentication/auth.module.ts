import { AuthController } from '@authentication/auth.controller';
import { AuthService } from '@authentication/auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../core/entities/user.entity';
import { UserRepository } from '../users/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthController],
  providers: [UserRepository, AuthService],
})
export class AuthModule {}
