import { Documentation } from '@core/documentation/documentation';
import { TattooArtistDoc } from '@core/documentation/tattoo-artist.doc';
import { QueryParamsPaginated } from '@core/dtos/query-params-paginated';
import { FindManyTattoosUseCase } from '@domains/tattoos/use-cases/CRUD/find-many/find-many.use-case';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RequestDTO, ResponseDTO } from '@tattoo-book-architecture/dtos';
import { TattooArtistsEntity } from '@tattoo-book-architecture/entities';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { JoiPipe } from 'nestjs-joi';
import { HoursFileType } from './document/horarios/horarios.document';
import { CreateTattooArtistDTO } from './dtos/create-tattoo-artist.dto';
import { UpdateTattooArtistDTO } from './dtos/update.tattoo.artist';
import { CreateTattooArtistUseCase } from './use-cases/CRUD/create/create.use-case';
import { DeleteTattooArtistUseCase } from './use-cases/CRUD/delete/delete.usecase';
import { FindOneTattooArtistUseCase } from './use-cases/CRUD/find-one/find-one.use-case';
import { UpdateTattooArtistUseCase } from './use-cases/CRUD/update/update.use-case';
import { DownloadTattooArtistScheduleUseCase } from './use-cases/download/tattoo-artist.service';

@Controller('tattoo-artists')
@UseGuards(AuthGuard)
export class TattooArtistsController {
  constructor(
    private readonly createTattooArtistUseCase: CreateTattooArtistUseCase,
    private readonly updateTattooArtistUseCase: UpdateTattooArtistUseCase,
    private readonly findManyTattoosUseCase: FindManyTattoosUseCase,
    private readonly findOneTattooArtistUseCase: FindOneTattooArtistUseCase,
    private readonly deleteTattooArtistUseCase: DeleteTattooArtistUseCase,
    private readonly downloadTattooArtistScheduleUseCase: DownloadTattooArtistScheduleUseCase,
  ) {}

  @Post()
  @Documentation(TattooArtistDoc.create)
  async create(@Req() req: RequestDTO, @Body(JoiPipe) createTattooArtistDTO: CreateTattooArtistDTO) {
    const tattooArtist = await this.createTattooArtistUseCase.execute(createTattooArtistDTO, req.user.id);
    return ResponseDTO.OK('Success on create tattoo artist', tattooArtist);
  }

  @Get()
  @Documentation(TattooArtistDoc.find)
  async find(@Req() req: RequestDTO, @Query() query: QueryParamsPaginated<TattooArtistsEntity>) {
    const tattooArtists = await this.findManyTattoosUseCase.execute(query, req.user.id);
    return ResponseDTO.OK('Success on find all tattoo artist', tattooArtists);
  }

  @Get('download/:type')
  @Documentation(TattooArtistDoc.download)
  async download(@Param('type') type: HoursFileType) {
    return await this.downloadTattooArtistScheduleUseCase.execute(type);
  }

  @Get(':id')
  @Documentation(TattooArtistDoc.findOne)
  async findOne(@Param('id') id: string) {
    const tattooArtist = await this.findOneTattooArtistUseCase.execute(+id);
    return ResponseDTO.OK(`Success on find tattoo artist with id ${id}`, tattooArtist);
  }

  @Patch(':id')
  @Documentation(TattooArtistDoc.update)
  async update(@Param('id') id: string, @Body(JoiPipe) updateTattooArtistDTO: UpdateTattooArtistDTO) {
    const tattooArtist = await this.updateTattooArtistUseCase.execute(+id, updateTattooArtistDTO);
    return ResponseDTO.OK(`Success on update tattoo artist with id ${id}`, tattooArtist);
  }

  @Delete(':id')
  @Documentation(TattooArtistDoc.delete)
  async delete(@Param('id') id: string) {
    const tattooArtist = await this.deleteTattooArtistUseCase.execute(+id);
    return ResponseDTO.OK(`Success on delete tattoo artist with id ${id}`, tattooArtist);
  }
}
