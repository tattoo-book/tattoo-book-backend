import { RequestDTO } from '@architecture/dtos/RequestDTO';
import { ResponseDTO } from '@architecture/dtos/ResponseDTO';
import { ExceptionDTO } from '@architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from '@architecture/guards/auth.guard';
import { ErrorHandler } from '@architecture/handlers/error.handler';
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
import { ListTattoosDTO } from '@tattoos/dtos/list-tattoo.dto';
import { UpdateTatttooDTO } from '@tattoos/dtos/update-tattoo.dto';
import { TattooService } from '@tattoos/tattoo.service';
import { JoiPipe } from 'nestjs-joi';

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
      const desc = ErrorHandler.execute(TattooController.logger, 'Failed on create tattoo', error);
      throw new ExceptionDTO(error.status, 'Failed on create tattoo', desc);
    }
  }

  @Get()
  async find(@Query(JoiPipe) query: ListTattoosDTO) {
    try {
      const tattoos = await this.tattooService.find(query);
      return ResponseDTO.OK('Success on find all tattoos', tattoos);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, 'Failed on find all tattoos', error);
      throw new ExceptionDTO(error.status, 'Failed on find all tattoos', desc);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const tattoo = await this.tattooService.findOne(+id);
      return ResponseDTO.OK(`Success on find tattoo with id ${id}`, tattoo);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, `Failed on find tattoo with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on find tattoo with id ${id}`, desc);
    }
  }

  @Patch(':id')
  async update(@Req() req: RequestDTO, @Param('id') id: string, @Body() updateTattooDTO: UpdateTatttooDTO) {
    try {
      const tattoo = await this.tattooService.update(+id, req.user.id, updateTattooDTO);
      return ResponseDTO.OK(`Success on update tattoo with id ${id}`, tattoo);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, `Failed on update tattoo with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on update tattoo with id ${id}`, desc);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.tattooService.delete(+id);
      return ResponseDTO.OK(`Success on delete tattoo with id ${id}`, null);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, `Failed on delete tattoo with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on delete tattoo with id ${id}`, desc);
    }
  }
}
