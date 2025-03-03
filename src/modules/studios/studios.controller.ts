import { RequestDTO } from '@architecture/dtos/RequestDTO';
import { ResponseDTO } from '@architecture/dtos/ResponseDTO';
import { ExceptionDTO } from '@architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from '@architecture/guards/auth.guard';
import { ErrorHandler } from '@architecture/handlers/error.handler';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { CreateStudioDTO } from 'src/modules/studios/dtos/create-studio.dto';
import { ListStudiosDTO } from 'src/modules/studios/dtos/list-studio.dto';
import { UpdateStudioDTO } from 'src/modules/studios/dtos/update-studio.dto';
import { StudiosService } from 'src/modules/studios/studios.service';

@Controller('studios')
@UseGuards(AuthGuard)
export class StudiosController {
  static readonly logger = new Logger('StudiosController');

  constructor(private readonly studiosService: StudiosService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Sucesso ao criar estudio' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiResponse({ status: 200, description: 'Sucesso ao listar estudios' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiParam({ name: 'id', description: 'ID do estudio' })
  @ApiResponse({ status: 200, description: 'Sucesso ao listar estudio' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiParam({ name: 'id', description: 'ID do estudio' })
  @ApiResponse({ status: 200, description: 'Sucesso ao atualizar estudio' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiParam({ name: 'id', description: 'ID do estudio' })
  @ApiResponse({ status: 200, description: 'Sucesso ao deletar estudio' })
  @ApiResponse({ status: 409, description: 'Apenas o proprietário pode atualizar' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
