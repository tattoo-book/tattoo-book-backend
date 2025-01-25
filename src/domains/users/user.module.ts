import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/architecture/repositories/base.repository';
import { UsersEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, BaseRepository],
})
export class UserModule {}
