import { Module } from '@nestjs/common';
import { TattooBookDatabaseModule } from 'src/external/database/database.module';
import { TattooService } from 'src/modules/tattoos/tattoo.service';
import { TattooController } from 'src/modules/tattoos/tattoos.controller';

@Module({
  imports: [TattooBookDatabaseModule],
  controllers: [TattooController],
  providers: [TattooService],
})
export class TattoosModule {}
