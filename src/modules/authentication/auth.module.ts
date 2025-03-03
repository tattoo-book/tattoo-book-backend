import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/modules/authentication/auth.controller';
import { AuthService } from 'src/modules/authentication/auth.service';
import { UsersEntity } from '../../core/entities/user.entity';
import { UserRepository } from '../users/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthController],
  providers: [UserRepository, AuthService],
})
export class AuthModule {}
