import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RequestDTO, ResponseDTO } from '@tattoo-book-architecture/dtos';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { JoiPipe } from 'nestjs-joi';
import { ListTattoosDTO } from 'src/modules/tattoos/dtos/list-tattoo.dto';
import { UpdateTatttooDTO } from 'src/modules/tattoos/dtos/update-tattoo.dto';
import { TattooService } from 'src/modules/tattoos/tattoo.service';
import { CreateTattooDTO } from './dtos/create-tattoo.dto';

@Controller('tattoos')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TattooController {
  constructor(private readonly tattooService: TattooService) {}

  @Post()
  @ApiBody({ type: () => CreateTattooDTO })
  @ApiResponse({ status: 200, description: 'Sucesso ao criar tatuagem' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Req() req: RequestDTO, @Body(JoiPipe) body: CreateTattooDTO) {
    const tattoo = await this.tattooService.create(body, req.user.id);
    return ResponseDTO.OK('Success on create tattoo', { id: tattoo.id });
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Sucesso ao listar tatuagens' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async find(@Req() req: RequestDTO, @Query(JoiPipe) query: ListTattoosDTO) {
    const tattoos = await this.tattooService.find(query, req.user.id);
    return ResponseDTO.OK('Success on find all tattoos', tattoos);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Sucesso ao listar tatuagem' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    const tattoo = await this.tattooService.findOne(+id);
    return ResponseDTO.OK(`Success on find tattoo with id ${id}`, tattoo);
  }

  @Post(':id/like')
  @ApiParam({ name: 'id', description: 'ID da tatuagem que vai ser curtida' })
  @ApiResponse({ status: 200, description: 'Sucesso ao curtir tatuagem' })
  @ApiResponse({ status: 409, description: 'Tatuagem já foi curtida pelo usuário' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async like(@Req() req: RequestDTO, @Param('id') id: string) {
    await this.tattooService.like(+id, req.user.id);
    return ResponseDTO.OK(`Success on like tattoo with id ${id}`, null);
  }

  @Delete(':id/unlike')
  @ApiParam({ name: 'id', description: 'ID da tatuagem que vai ser descurtida' })
  @ApiResponse({ status: 200, description: 'Sucesso ao descurtir tatuagem' })
  @ApiResponse({ status: 409, description: 'Tatuagem já foi curtida pelo usuário' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async unlike(@Req() req: RequestDTO, @Param('id') id: string) {
    await this.tattooService.unlike(+id, req.user.id);
    return ResponseDTO.OK(`Success on unlike tattoo with id ${id}`, null);
  }

  @Patch(':id')
  @ApiBody({ type: () => UpdateTatttooDTO })
  @ApiResponse({ status: 200, description: 'Sucesso ao atualizar tatuagem' })
  @ApiResponse({ status: 409, description: 'Apenas o dono pode atualizar a tatuagem' })
  @ApiResponse({ status: 404, description: 'Tatuagem não encontrada' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Req() req: RequestDTO, @Param('id') id: string, @Body(JoiPipe) updateTattooDTO: UpdateTatttooDTO) {
    const tattoo = await this.tattooService.update(+id, req.user.id, updateTattooDTO);
    return ResponseDTO.OK(`Success on update tattoo with id ${id}`, tattoo);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Sucesso ao deletar tatuagem' })
  @ApiResponse({ status: 409, description: 'Apenas o dono pode deletar a tatuagem' })
  @ApiResponse({ status: 404, description: 'Tatuagem não encontrada' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async delete(@Param('id') id: string) {
    await this.tattooService.delete(+id);
    return ResponseDTO.OK(`Success on delete tattoo with id ${id}`, null);
  }
}
