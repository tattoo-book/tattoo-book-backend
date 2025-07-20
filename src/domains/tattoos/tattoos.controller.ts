import { Documentation } from '@core/documentation/documentation';
import { TattooDoc } from '@core/documentation/tattoos.doc';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RequestDTO, ResponseDTO } from '@tattoo-book-architecture/dtos';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { JoiPipe } from 'nestjs-joi';
import { ListTattoosDTO } from 'src/domains/tattoos/dtos/list-tattoo.dto';
import { UpdateTattooDTO } from 'src/domains/tattoos/dtos/update-tattoo.dto';
import { CreateTattooDTO } from './dtos/create-tattoo.dto';
import { CreateTattooUseCase } from './use-cases/CRUD/create/create-tattoo.use-case';
import { DeleteTattooUseCase } from './use-cases/CRUD/delete/delete.use-case';
import { FindManyTattoosUseCase } from './use-cases/CRUD/find-many/find-many.use-case';
import { FindOneTattooUseCase } from './use-cases/CRUD/find-one/find-onse.use-case';
import { UpdateTattooUseCase } from './use-cases/CRUD/update/update-tattoo.use-case';
import { LikeTattooUseCase } from './use-cases/like/like.use-case';
import { UnlikeTattooUseCase } from './use-cases/unlike/unlike.use-case';

@Controller('tattoos')
@UseGuards(AuthGuard)
export class TattooController {
  constructor(
    private readonly createTattooUseCase: CreateTattooUseCase,
    private readonly updateTattooUseCase: UpdateTattooUseCase,
    private readonly findManyTattoosUseCase: FindManyTattoosUseCase,
    private readonly findOneTattooUseCase: FindOneTattooUseCase,
    private readonly deleteTattooUseCase: DeleteTattooUseCase,
    private readonly likeTattooUseCase: LikeTattooUseCase,
    private readonly unlikeTattooUseCase: UnlikeTattooUseCase,
  ) {}

  @Post()
  @Documentation(TattooDoc.create)
  async create(@Req() req: RequestDTO, @Body(JoiPipe) body: CreateTattooDTO) {
    const tattoo = await this.createTattooUseCase.execute(body, req.user.id);
    return ResponseDTO.OK('Success on create tattoo', { id: tattoo.id });
  }

  @Get()
  @Documentation(TattooDoc.find)
  async find(@Req() req: RequestDTO, @Query(JoiPipe) query: ListTattoosDTO) {
    const tattoos = await this.findManyTattoosUseCase.execute(query, req.user.id);
    return ResponseDTO.OK('Success on find all tattoos', tattoos);
  }

  @Get(':id')
  @Documentation(TattooDoc.findOne)
  async findOne(@Param('id') id: string) {
    const tattoo = await this.findOneTattooUseCase.execute(+id);
    return ResponseDTO.OK(`Success on find tattoo with id ${id}`, tattoo);
  }

  @Post(':id/like')
  @Documentation(TattooDoc.like)
  async like(@Req() req: RequestDTO, @Param('id') id: string) {
    await this.likeTattooUseCase.execute(+id, req.user.id);
    return ResponseDTO.OK(`Success on like tattoo with id ${id}`, null);
  }

  @Delete(':id/unlike')
  @Documentation(TattooDoc.unlike)
  async unlike(@Req() req: RequestDTO, @Param('id') id: string) {
    await this.unlikeTattooUseCase.execute(+id, req.user.id);
    return ResponseDTO.OK(`Success on unlike tattoo with id ${id}`, null);
  }

  @Patch(':id')
  @Documentation(TattooDoc.update)
  async update(@Req() req: RequestDTO, @Param('id') id: string, @Body(JoiPipe) updateTattooDTO: UpdateTattooDTO) {
    const tattoo = await this.updateTattooUseCase.execute(+id, req.user.id, updateTattooDTO);
    return ResponseDTO.OK(`Success on update tattoo with id ${id}`, tattoo);
  }

  @Delete(':id')
  @Documentation(TattooDoc.delete)
  async delete(@Param('id') id: string) {
    await this.deleteTattooUseCase.execute(+id);
    return ResponseDTO.OK(`Success on delete tattoo with id ${id}`, null);
  }
}
