import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RequestDTO, ResponseDTO } from '@tattoo-book-architecture/dtos';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { JoiPipe } from 'nestjs-joi';
import { CreateStudioDTO } from 'src/modules/studios/dtos/create-studio.dto';
import { ListStudiosDTO } from 'src/modules/studios/dtos/list-studio.dto';
import { UpdateStudioDTO } from 'src/modules/studios/dtos/update-studio.dto';
import { StudiosService } from 'src/modules/studios/studios.service';

@Controller('studios')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Sucesso ao criar estudio' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Req() req: RequestDTO, @Body(JoiPipe) createStudioDTO: CreateStudioDTO) {
    const studio = await this.studiosService.create(createStudioDTO, req.user.id);
    return ResponseDTO.OK('Success on create studio', studio);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Sucesso ao listar estudios' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(@Query(JoiPipe) query: ListStudiosDTO) {
    const studios = await this.studiosService.findAll(query);
    return ResponseDTO.OK('Success on find all studio', studios);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do estudio' })
  @ApiResponse({ status: 200, description: 'Sucesso ao listar estudio' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    const studio = await this.studiosService.findOne(+id);
    return ResponseDTO.OK(`Success on find studio with id ${id}`, studio);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID do estudio' })
  @ApiResponse({ status: 200, description: 'Sucesso ao atualizar estudio' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Req() req: RequestDTO, @Param('id') id: string, @Body(JoiPipe) createStudioDTO: UpdateStudioDTO) {
    const studio = await this.studiosService.update(+id, req.user.id, createStudioDTO);
    return ResponseDTO.OK(`Success on update studio with id ${id}`, studio);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do estudio' })
  @ApiResponse({ status: 200, description: 'Sucesso ao deletar estudio' })
  @ApiResponse({ status: 409, description: 'Apenas o proprietário pode atualizar' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async delete(@Req() req: RequestDTO, @Param('id') id: string) {
    const studio = await this.studiosService.delete(+id, req.user.id);
    return ResponseDTO.OK(`Success on delete studio with id ${id}`, studio);
  }
}
