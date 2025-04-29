import { Module } from '@nestjs/common';
import { TattooService } from 'src/domains/tattoos/tattoo.service';
import { TattooController } from 'src/domains/tattoos/tattoos.controller';
import { DatabaseModule } from 'src/external/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TattooController],
  providers: [TattooService],
})
export class TattoosModule {}
