import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { RequestDTO } from 'src/architecture/dtos/RequestDTO';
import { ResponseDTO } from 'src/architecture/dtos/ResponseDTO';
import { ResponseErrorDTO } from 'src/architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from 'src/architecture/guards/auth.guard';
import { ErrorHandler } from 'src/architecture/handlers/error.handler';
import { CreateTattooArtistDTO } from 'src/domains/tattoo-artist/dtos/CreateTattooArtistDTO';
import { TattooArtistService } from 'src/domains/tattoo-artist/tattoo-artist.service';

@Controller('tattoo-artists')
@UseGuards(AuthGuard)
export class TattooArtistsController {
  static logger = new Logger('TattooArtistsController');

  constructor(private tattooArtistService: TattooArtistService) {}

  @Post()
  @UsePipes(new JoiPipe())
  async create(@Req() req: RequestDTO, @Body() createTattooArtistDTO: CreateTattooArtistDTO) {
    try {
      const tattooArtist = await this.tattooArtistService.create(createTattooArtistDTO, req.user.id);
      return ResponseDTO.OK('Success on create tattoo artist', tattooArtist);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(TattooArtistsController.logger, 'Failed on create tattoo artist', error);
      return new ResponseErrorDTO(error.status, 'Failed on create tattoo artist', errorDescription);
    }
  }

  @Get()
  async findAll() {
    try {
      const tattooArtists = await this.tattooArtistService.findAll();
      return ResponseDTO.OK('Success on find all tattoo artist', tattooArtists);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(TattooArtistsController.logger, 'Failed on find all tattoo artist', error);
      return new ResponseErrorDTO(error.status, 'Failed on find all tattoo artist', errorDescription);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const tattooArtist = await this.tattooArtistService.findOne(+id);
      return ResponseDTO.OK(`Success on find tattoo artist with id ${id}`, tattooArtist);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(TattooArtistsController.logger, 'Failed in list tattoo artist', error);
      return new ResponseErrorDTO(error.status, 'Failed on find all tattoo artist', errorDescription);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const tattooArtist = await this.tattooArtistService.delete(+id);
      return ResponseDTO.OK(`Success on delete tattoo artist with id ${id}`, tattooArtist);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(TattooArtistsController.logger, `Failed on delete tattoo artist with id ${id}`, error);
      return new ResponseErrorDTO(error.status, `Failed on delete tattoo artist with id ${id}`, errorDescription);
    }
  }
}
