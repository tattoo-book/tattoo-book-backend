import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattoosEntity } from './entities/tattoos.entity';
import { TattoosRepository } from './repositories/tattoos.repository';
import { TattooService } from './tattoo.service';
import { TattooController } from './tattoos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TattoosEntity])],
  controllers: [TattooController],
  providers: [TattooService, TattoosRepository],
})
export class TattoosModule {}
