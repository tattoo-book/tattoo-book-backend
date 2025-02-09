import { BaseRepository } from '@architecture/repositories/base.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '@users/entities/user.entity';
import { UserRepository } from '@users/repositories/user.repository';
import { UsersController } from '@users/user.controller';
import { UsersService } from '@users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, BaseRepository],
})
export class UserModule {}
