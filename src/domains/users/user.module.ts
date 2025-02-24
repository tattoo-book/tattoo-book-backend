import { BaseRepository } from '@architecture/repositories/base.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@users/repositories/user.repository';
import { UsersController } from '@users/user.controller';
import { UsersService } from '@users/users.service';
import { TattoosLikesEntity } from 'src/core/entities/tattoos-likes';
import { UsersEntity } from 'src/core/entities/user.entity';
import { TattooLikeRepository } from 'src/core/repositories/tattoo-likes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, TattoosLikesEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, BaseRepository, TattooLikeRepository],
})
export class UserModule {}
