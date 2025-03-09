import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RequestDTO, ResponseDTO } from '@tattoo-book-architecture/dtos';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { JoiPipe } from 'nestjs-joi';
import { CreateTattooArtistDTO } from 'src/domains/tattoo-artist/dtos/CreateTattooArtistDTO';
import { UpdateTattooArtistDTO } from 'src/domains/tattoo-artist/dtos/update.tattoo.artist';
import { TattooArtistService } from 'src/domains/tattoo-artist/tattoo-artist.service';
import { HorariosFileType } from './document/horarios/horarios.document';

@Controller('tattoo-artists')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TattooArtistsController {
  constructor(private readonly tattooArtistService: TattooArtistService) {}

  @Post()
  @ApiBody({ description: 'Dados de criação do tatuador', type: () => CreateTattooArtistDTO })
  @ApiResponse({ status: 200, description: 'Sucesso ao criar tatuador' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Req() req: RequestDTO, @Body(JoiPipe) createTattooArtistDTO: CreateTattooArtistDTO) {
    const tattooArtist = await this.tattooArtistService.create(createTattooArtistDTO, req.user.id);
    return ResponseDTO.OK('Success on create tattoo artist', tattooArtist);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Sucess ao listar tatuadores' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async find() {
    const tattooArtists = await this.tattooArtistService.find();
    return ResponseDTO.OK('Success on find all tattoo artist', tattooArtists);
  }

  @Get('download/:type')
  @ApiParam({ name: 'typw', description: 'Tipo de arquivo que vai ser exportado' })
  @ApiResponse({ status: 200, description: 'Sucess ao exportar horários' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async download(@Param('type') type: HorariosFileType) {
    return await this.tattooArtistService.download(type);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do tatuador' })
  @ApiResponse({ status: 200, description: 'Sucess ao listar tatuador' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    const tattooArtist = await this.tattooArtistService.findOne(+id);
    return ResponseDTO.OK(`Success on find tattoo artist with id ${id}`, tattooArtist);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID do tatuador que vai ser atualizado' })
  @ApiBody({ description: 'Dados de atualização do tatuador', type: () => UpdateTattooArtistDTO })
  @ApiResponse({ status: 200, description: 'Sucess ao atualizar tatuador' })
  @ApiResponse({ status: 404, description: 'Tatuador não encontrada' })
  @ApiResponse({ status: 409, description: 'Apenas o proprio tatuador pode atualizar seus atributos' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Param('id') id: string, @Body(JoiPipe) updateTattooArtistDTO: UpdateTattooArtistDTO) {
    const tattooArtist = await this.tattooArtistService.update(+id, updateTattooArtistDTO);
    return ResponseDTO.OK(`Success on update tattoo artist with id ${id}`, tattooArtist);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do tatuador' })
  @ApiResponse({ status: 200, description: 'Sucess ao atualizar tatuador' })
  @ApiResponse({ status: 404, description: 'Tatuador não encontrada' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async delete(@Param('id') id: string) {
    const tattooArtist = await this.tattooArtistService.delete(+id);
    return ResponseDTO.OK(`Success on delete tattoo artist with id ${id}`, tattooArtist);
  }
}
