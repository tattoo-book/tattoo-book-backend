import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiPipe } from 'nestjs-joi';
import { RequestDTO } from 'src/architecture/dtos/RequestDTO';
import { ResponseDTO } from 'src/architecture/dtos/ResponseDTO';
import { ResponseErrorDTO } from 'src/architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from 'src/architecture/guards/auth.guard';
import { ErrorHandler } from 'src/architecture/handlers/error.handler';
import { TattooService } from 'src/domains/tattoos/tattoo.service';
import { ListTattoosDTO } from './dtos/list-tattoo.dto';
import { UpdateTatttooDTO } from './dtos/update-tattoo.dto';

@Controller('tattoos')
@UseGuards(AuthGuard)
export class TattooController {
  static logger = new Logger('TattooController');

  constructor(private tattooService: TattooService) {}

  @Post()
  @UsePipes(new JoiPipe())
  @UseInterceptors(FileInterceptor('image'))
  async createJob(@Req() req: RequestDTO, @UploadedFile() file: Express.Multer.File) {
    try {
      await this.tattooService.create(file, req.user.id);
      return ResponseDTO.OK('Success on create tattoo', null);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(TattooController.logger, 'Failed on create tattoo', error);
      throw new ResponseErrorDTO(error.status, 'Failed on create tattoo', errorDescription);
    }
  }

  @Get()
  async find(@Query(JoiPipe) query: ListTattoosDTO) {
    try {
      const tattoos = await this.tattooService.find(query);
      return ResponseDTO.OK('Success on find all tattoos', tattoos);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(TattooController.logger, 'Failed on find all tattoos', error);
      throw new ResponseErrorDTO(error.status, 'Failed on find all tattoos', errorDescription);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const tattoo = await this.tattooService.findOne(+id);
      return ResponseDTO.OK(`Success on find tattoo with id ${id}`, tattoo);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(TattooController.logger, `Failed on find tattoo with id ${id}`, error);
      throw new ResponseErrorDTO(error.status, `Failed on find tattoo with id ${id}`, errorDescription);
    }
  }

  @Patch(':id')
  async update(@Req() req: RequestDTO, @Param('id') id: string, @Body() updateTattooDTO: UpdateTatttooDTO) {
    try {
      const tattoo = await this.tattooService.update(+id, req.user.id, updateTattooDTO);
      return ResponseDTO.OK(`Success on update tattoo with id ${id}`, tattoo);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(TattooController.logger, `Failed on update tattoo with id ${id}`, error);
      throw new ResponseErrorDTO(error.status, `Failed on update tattoo with id ${id}`, errorDescription);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.tattooService.delete(+id);
      return ResponseDTO.OK(`Success on delete tattoo with id ${id}`, null);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(TattooController.logger, `Failed on delete tattoo with id ${id}`, error);
      throw new ResponseErrorDTO(error.status, `Failed on delete tattoo with id ${id}`, errorDescription);
    }
  }
}
