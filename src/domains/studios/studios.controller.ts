import { RequestDTO } from '@architecture/dtos/RequestDTO';
import { ResponseDTO } from '@architecture/dtos/ResponseDTO';
import { ExceptionDTO } from '@architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from '@architecture/guards/auth.guard';
import { ErrorHandler } from '@architecture/handlers/error.handler';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateStudioDTO } from '@studios/dtos/create-studio.dto';
import { ListStudiosDTO } from '@studios/dtos/list-studio.dto';
import { UpdateStudioDTO } from '@studios/dtos/update-studio.dto';
import { StudiosService } from '@studios/studios.service';
import { JoiPipe } from 'nestjs-joi';

@Controller('studios')
@UseGuards(AuthGuard)
export class StudiosController {
  static logger = new Logger('StudiosController');

  constructor(private studiosService: StudiosService) {}

  @Post()
  async create(@Req() req: RequestDTO, @Body(JoiPipe) createStudioDTO: CreateStudioDTO) {
    try {
      const studio = await this.studiosService.create(createStudioDTO, req.user.id);
      return ResponseDTO.OK('Success on create studio', studio);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(StudiosController.logger, 'Failed on create studio', error);
      throw new ExceptionDTO(error.status, 'Failed on create studio', errorDescription);
    }
  }

  @Get()
  async findAll(@Query(JoiPipe) query: ListStudiosDTO) {
    try {
      const studios = await this.studiosService.findAll(query);
      return ResponseDTO.OK('Success on find all studio', studios);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(StudiosController.logger, 'Failed on find all studio', error);
      throw new ExceptionDTO(error.status, 'Failed on find all studio', errorDescription);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const studio = await this.studiosService.findOne(+id);
      return ResponseDTO.OK(`Success on find studio with id ${id}`, studio);
    } catch (error) {
      const desc = ErrorHandler.execute(StudiosController.logger, `Failed on find studio with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on find studio with id ${id}`, desc);
    }
  }

  @Patch(':id')
  async update(@Req() req: RequestDTO, @Param('id') id: string, @Body(JoiPipe) createStudioDTO: UpdateStudioDTO) {
    try {
      const studio = await this.studiosService.update(+id, req.user.id, createStudioDTO);
      return ResponseDTO.OK(`Success on update studio with id ${id}`, studio);
    } catch (error) {
      const desc = ErrorHandler.execute(StudiosController.logger, `Failed on update studio with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on update studio with id ${id}`, desc);
    }
  }

  @Delete(':id')
  async delete(@Req() req: RequestDTO, @Param('id') id: string) {
    try {
      const studio = await this.studiosService.delete(+id, req.user.id);
      return ResponseDTO.OK(`Success on delete studio with id ${id}`, studio);
    } catch (error) {
      const desc = ErrorHandler.execute(StudiosController.logger, `Failed on delete studio with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on delete studio with id ${id}`, desc);
    }
  }
}
