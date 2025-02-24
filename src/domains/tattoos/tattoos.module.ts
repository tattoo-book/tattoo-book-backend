import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooService } from '@tattoos/tattoo.service';
import { TattooController } from '@tattoos/tattoos.controller';
import { TattoosLikesEntity } from 'src/core/entities/tattoos-likes';
import { TattoosEntity } from 'src/core/entities/tattoos.entity';
import { TattooLikeRepository } from 'src/core/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/core/repositories/tattoos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TattoosEntity, TattoosLikesEntity])],
  controllers: [TattooController],
  providers: [TattooService, TattoosRepository, TattooLikeRepository],
})
export class TattoosModule {}
