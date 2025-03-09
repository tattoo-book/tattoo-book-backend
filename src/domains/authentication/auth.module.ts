import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/domains/authentication/auth.controller';
import { AuthService } from 'src/domains/authentication/auth.service';
import { UsersEntity } from 'src/shared/entities/user.entity';
import { UserRepository } from '../users/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthController],
  providers: [UserRepository, AuthService],
})
export class AuthModule {}
