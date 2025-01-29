import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattoosEntity } from '@tattoos/entities/tattoos.entity';
import { TattoosRepository } from '@tattoos/repositories/tattoos.repository';
import { TattooService } from '@tattoos/tattoo.service';
import { TattooController } from '@tattoos/tattoos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TattoosEntity])],
  controllers: [TattooController],
  providers: [TattooService, TattoosRepository],
})
export class TattoosModule {}
