import { RequestDTO } from '@architecture/dtos/RequestDTO';
import { ResponseDTO } from '@architecture/dtos/ResponseDTO';
import { ExceptionDTO } from '@architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from '@architecture/guards/auth.guard';
import { ErrorHandler } from '@architecture/handlers/error.handler';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { ListTattoosDTO } from 'src/domains/tattoos/dtos/list-tattoo.dto';
import { UpdateTatttooDTO } from 'src/domains/tattoos/dtos/update-tattoo.dto';
import { TattooService } from 'src/domains/tattoos/tattoo.service';
import { CreateTattooDTO } from './dtos/create-tattoo.dto';

@Controller('tattoos')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TattooController {
  static readonly logger = new Logger('TattooController');

  constructor(private readonly tattooService: TattooService) {}

  @Post()
  @ApiBody({ type: () => CreateTattooDTO })
  @ApiResponse({ status: 200, description: 'Sucesso ao criar tatuagem' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Req() req: RequestDTO, @Body(JoiPipe) body: CreateTattooDTO) {
    try {
      const tattoo = await this.tattooService.create(body, req.user.id);
      return ResponseDTO.OK('Success on create tattoo', { id: tattoo.id });
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, 'Failed on create tattoo', error);
      throw new ExceptionDTO(error.status, 'Failed on create tattoo', desc);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Sucesso ao listar tatuagens' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async find(@Req() req: RequestDTO, @Query(JoiPipe) query: ListTattoosDTO) {
    try {
      const tattoos = await this.tattooService.find(query, req.user.id);
      return ResponseDTO.OK('Success on find all tattoos', tattoos);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, 'Failed on find all tattoos', error);
      throw new ExceptionDTO(error.status, 'Failed on find all tattoos', desc);
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Sucesso ao listar tatuagem' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    try {
      const tattoo = await this.tattooService.findOne(+id);
      return ResponseDTO.OK(`Success on find tattoo with id ${id}`, tattoo);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, `Failed on find tattoo with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on find tattoo with id ${id}`, desc);
    }
  }

  @Post(':id/like')
  @ApiParam({ name: 'id', description: 'ID da tatuagem que vai ser curtida' })
  @ApiResponse({ status: 200, description: 'Sucesso ao curtir tatuagem' })
  @ApiResponse({ status: 409, description: 'Tatuagem já foi curtida pelo usuário' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async like(@Req() req: RequestDTO, @Param('id') id: string) {
    try {
      await this.tattooService.like(+id, req.user.id);
      return ResponseDTO.OK(`Success on like tattoo with id ${id}`, null);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, `Failed on like tattoo with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on like tattoo with id ${id}`, desc);
    }
  }

  @Delete(':id/unlike')
  @ApiParam({ name: 'id', description: 'ID da tatuagem que vai ser descurtida' })
  @ApiResponse({ status: 200, description: 'Sucesso ao descurtir tatuagem' })
  @ApiResponse({ status: 409, description: 'Tatuagem já foi curtida pelo usuário' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async unlike(@Req() req: RequestDTO, @Param('id') id: string) {
    try {
      await this.tattooService.unlike(+id, req.user.id);
      return ResponseDTO.OK(`Success on unlike tattoo with id ${id}`, null);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, `Failed on unlike tattoo with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on unlike tattoo with id ${id}`, desc);
    }
  }

  @Patch(':id')
  @ApiBody({ type: () => UpdateTatttooDTO })
  @ApiResponse({ status: 200, description: 'Sucesso ao atualizar tatuagem' })
  @ApiResponse({ status: 409, description: 'Apenas o dono pode atualizar a tatuagem' })
  @ApiResponse({ status: 404, description: 'Tatuagem não encontrada' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Req() req: RequestDTO, @Param('id') id: string, @Body(JoiPipe) updateTattooDTO: UpdateTatttooDTO) {
    try {
      const tattoo = await this.tattooService.update(+id, req.user.id, updateTattooDTO);
      return ResponseDTO.OK(`Success on update tattoo with id ${id}`, tattoo);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooController.logger, `Failed on update tattoo with id ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on update tattoo with id ${id}`, desc);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Sucesso ao deletar tatuagem' })
  @ApiResponse({ status: 409, description: 'Apenas o dono pode deletar a tatuagem' })
  @ApiResponse({ status: 404, description: 'Tatuagem não encontrada' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
