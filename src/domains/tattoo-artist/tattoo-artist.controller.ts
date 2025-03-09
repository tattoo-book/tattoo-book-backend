import { RequestDTO } from '@architecture/dtos/RequestDTO';
import { ResponseDTO } from '@architecture/dtos/ResponseDTO';
import { ExceptionDTO } from '@architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from '@architecture/guards/auth.guard';
import { ErrorHandler } from '@architecture/handlers/error.handler';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { CreateTattooArtistDTO } from 'src/domains/tattoo-artist/dtos/CreateTattooArtistDTO';
import { UpdateTattooArtistDTO } from 'src/domains/tattoo-artist/dtos/update.tattoo.artist';
import { TattooArtistService } from 'src/domains/tattoo-artist/tattoo-artist.service';
import { HorariosFileType } from './document/horarios/horarios.document';

@Controller('tattoo-artists')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TattooArtistsController {
  static readonly logger = new Logger('TattooArtistsController');

  constructor(private readonly tattooArtistService: TattooArtistService) {}

  @Post()
  @ApiBody({ description: 'Dados de criação do tatuador', type: () => CreateTattooArtistDTO })
  @ApiResponse({ status: 200, description: 'Sucesso ao criar tatuador' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Req() req: RequestDTO, @Body(JoiPipe) createTattooArtistDTO: CreateTattooArtistDTO) {
    try {
      const tattooArtist = await this.tattooArtistService.create(createTattooArtistDTO, req.user.id);
      return ResponseDTO.OK('Success on create tattoo artist', tattooArtist);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooArtistsController.logger, 'Failed on create tattoo artist', error);
      throw new ExceptionDTO(error.status, 'Failed on create tattoo artist', desc);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Sucess ao listar tatuadores' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async find() {
    try {
      const tattooArtists = await this.tattooArtistService.find();
      return ResponseDTO.OK('Success on find all tattoo artist', tattooArtists);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooArtistsController.logger, 'Failed on find tattoo artist', error);
      throw new ExceptionDTO(error.status, 'Failed on find all tattoo artist', desc);
    }
  }

  @Get('download/:type')
  @ApiParam({ name: 'typw', description: 'Tipo de arquivo que vai ser exportado' })
  @ApiResponse({ status: 200, description: 'Sucess ao exportar horários' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async download(@Param('type') type: HorariosFileType) {
    try {
      return await this.tattooArtistService.download(type);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooArtistsController.logger, 'Failed on download', error);
      throw new ExceptionDTO(error.status, 'Failed on download', desc);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do tatuador' })
  @ApiResponse({ status: 200, description: 'Sucess ao listar tatuador' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    try {
      const tattooArtist = await this.tattooArtistService.findOne(+id);
      return ResponseDTO.OK(`Success on find tattoo artist with id ${id}`, tattooArtist);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooArtistsController.logger, 'Failed in list tattoo artist', error);
      throw new ExceptionDTO(error.status, 'Failed on find all tattoo artist', desc);
    }
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID do tatuador que vai ser atualizado' })
  @ApiBody({ description: 'Dados de atualização do tatuador', type: () => UpdateTattooArtistDTO })
  @ApiResponse({ status: 200, description: 'Sucess ao atualizar tatuador' })
  @ApiResponse({ status: 404, description: 'Tatuador não encontrada' })
  @ApiResponse({ status: 409, description: 'Apenas o proprio tatuador pode atualizar seus atributos' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Param('id') id: string, @Body(JoiPipe) updateTattooArtistDTO: UpdateTattooArtistDTO) {
    try {
      const tattooArtist = await this.tattooArtistService.update(+id, updateTattooArtistDTO);
      return ResponseDTO.OK(`Success on update tattoo artist with id ${id}`, tattooArtist);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooArtistsController.logger, `Failed on update tattoo artist ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on update tattoo artist with id ${id}`, desc);
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do tatuador' })
  @ApiResponse({ status: 200, description: 'Sucess ao atualizar tatuador' })
  @ApiResponse({ status: 404, description: 'Tatuador não encontrada' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async delete(@Param('id') id: string) {
    try {
      const tattooArtist = await this.tattooArtistService.delete(+id);
      return ResponseDTO.OK(`Success on delete tattoo artist with id ${id}`, tattooArtist);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooArtistsController.logger, `Failed on delete tattoo artist ${id}`, error);
      throw new ExceptionDTO(error.status, `Failed on delete tattoo artist with id ${id}`, desc);
    }
  }
}
