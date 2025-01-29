import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { RequestDTO } from 'src/architecture/dtos/RequestDTO';
import { ResponseDTO } from 'src/architecture/dtos/ResponseDTO';
import { ExceptionDTO } from 'src/architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from 'src/architecture/guards/auth.guard';
import { ErrorHandler } from 'src/architecture/handlers/error.handler';
import { CreateStudioDTO } from 'src/domains/studios/dtos/create-studio.dto';
import { StudiosService } from 'src/domains/studios/studios.service';
import { UpdateStudioDTO } from './dtos/update-studio.dto';

@Controller('studios')
@UseGuards(AuthGuard)
export class StudiosController {
  static logger = new Logger('StudiosController');

  constructor(private studiosService: StudiosService) {}

  @Post()
  @UsePipes(new JoiPipe())
  async create(@Req() req: RequestDTO, @Body() createStudioDTO: CreateStudioDTO) {
    try {
      const studio = await this.studiosService.create(createStudioDTO, req.user.id);
      return ResponseDTO.OK('Success on create studio', studio);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(StudiosController.logger, 'Failed on create studio', error);
      throw new ExceptionDTO(error.status, 'Failed on create studio', errorDescription);
    }
  }

  @Get()
  async findAll() {
    try {
      const studios = await this.studiosService.findAll();
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
      const errorDescription = ErrorHandler.execute(
        StudiosController.logger,
        `Failed on find studio with id ${id}`,
        error,
      );
      throw new ExceptionDTO(error.status, `Failed on find studio with id ${id}`, errorDescription);
    }
  }

  @Patch(':id')
  async update(@Req() req: RequestDTO, @Param('id') id: string, @Body(JoiPipe) createStudioDTO: UpdateStudioDTO) {
    try {
      const studio = await this.studiosService.update(+id, req.user.id, createStudioDTO);
      return ResponseDTO.OK(`Success on update studio with id ${id}`, studio);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(
        StudiosController.logger,
        `Failed on update studio with id ${id}`,
        error,
      );
      throw new ExceptionDTO(error.status, `Failed on update studio with id ${id}`, errorDescription);
    }
  }

  @Delete(':id')
  async delete(@Req() req: RequestDTO, @Param('id') id: string) {
    try {
      const studio = await this.studiosService.delete(+id, req.user.id);
      return ResponseDTO.OK(`Success on delete studio with id ${id}`, studio);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(
        StudiosController.logger,
        `Failed on delete studio with id ${id}`,
        error,
      );
      throw new ExceptionDTO(error.status, `Failed on delete studio with id ${id}`, errorDescription);
    }
  }
}
