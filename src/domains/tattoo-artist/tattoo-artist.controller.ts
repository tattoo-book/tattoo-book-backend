import { RequestDTO } from '@architecture/dtos/RequestDTO';
import { ResponseDTO } from '@architecture/dtos/ResponseDTO';
import { ExceptionDTO } from '@architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from '@architecture/guards/auth.guard';
import { ErrorHandler } from '@architecture/handlers/error.handler';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { CreateTattooArtistDTO } from '@tattoo-artist/dtos/CreateTattooArtistDTO';
import { UpdateTattooArtistDTO } from '@tattoo-artist/dtos/update.tattoo.artist';
import { TattooArtistService } from '@tattoo-artist/tattoo-artist.service';
import { JoiPipe } from 'nestjs-joi';

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
      const desc = ErrorHandler.execute(TattooArtistsController.logger, 'Failed on create tattoo artist', error);
      throw new ExceptionDTO(error.status, 'Failed on create tattoo artist', desc);
    }
  }

  @Get()
  async find() {
    try {
      const tattooArtists = await this.tattooArtistService.find();
      return ResponseDTO.OK('Success on find all tattoo artist', tattooArtists);
    } catch (error) {
      const desc = ErrorHandler.execute(TattooArtistsController.logger, 'Failed on find tattoo artist', error);
      throw new ExceptionDTO(error.status, 'Failed on find all tattoo artist', desc);
    }
  }

  @Get(':id')
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
