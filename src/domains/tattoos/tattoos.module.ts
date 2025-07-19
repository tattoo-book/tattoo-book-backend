import { Module } from '@nestjs/common';
import { TattooService } from 'src/domains/tattoos/tattoo.service';
import { TattooBookDatabaseModule } from 'src/external/database/database.module';
import { TattooController } from './tattoos.controller';

@Module({
  imports: [TattooBookDatabaseModule],
  controllers: [TattooController],
  providers: [TattooService],
})
export class TattoosModule {}
