import { Documentation } from '@core/documentation/documentation';
import { StudiosDoc } from '@core/documentation/studios.doc';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RequestDTO, ResponseDTO } from '@tattoo-book-architecture/dtos';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { JoiPipe } from 'nestjs-joi';
import { CreateStudioDTO } from 'src/domains/studios/dtos/create-studio.dto';
import { ListStudiosDTO } from 'src/domains/studios/dtos/list-studio.dto';
import { UpdateStudioDTO } from 'src/domains/studios/dtos/update-studio.dto';
import { CreateStudioUseCase } from './use-cases/CRUD/create/create.use-case';
import { DeleteStudioUseCase } from './use-cases/CRUD/delete/delete.use-case';
import { FindAllStudioUseCase } from './use-cases/CRUD/find-many/find-many.use-case';
import { FindOneStudioUseCase } from './use-cases/CRUD/find-one/find-one.use-case';
import { UpdateStudioUseCase } from './use-cases/CRUD/update/update.use-case';

@Controller('studios')
@UseGuards(AuthGuard)
export class StudiosController {
  constructor(
    private readonly createStudioUseCase: CreateStudioUseCase,
    private readonly findAllStudioUseCase: FindAllStudioUseCase,
    private readonly findOneStudioUseCase: FindOneStudioUseCase,
    private readonly updateStudioUseCase: UpdateStudioUseCase,
    private readonly deleteStudioUseCase: DeleteStudioUseCase,
  ) {}

  @Post()
  @Documentation(StudiosDoc.create)
  async create(@Req() req: RequestDTO, @Body(JoiPipe) createStudioDTO: CreateStudioDTO) {
    const studio = await this.createStudioUseCase.execute(createStudioDTO, req.user.id);
    return ResponseDTO.OK('Success on create studio', studio);
  }

  @Get()
  @Documentation(StudiosDoc.findAll)
  async findAll(@Query(JoiPipe) query: ListStudiosDTO) {
    const studios = await this.findAllStudioUseCase.execute(query);
    return ResponseDTO.OK('Success on find all studio', studios);
  }

  @Get(':id')
  @Documentation(StudiosDoc.findOne)
  async findOne(@Param('id') id: string) {
    const studio = await this.findOneStudioUseCase.execute(+id);
    return ResponseDTO.OK(`Success on find studio with id ${id}`, studio);
  }

  @Patch(':id')
  @Documentation(StudiosDoc.update)
  async update(@Req() req: RequestDTO, @Param('id') id: string, @Body(JoiPipe) createStudioDTO: UpdateStudioDTO) {
    const studio = await this.updateStudioUseCase.execute(+id, req.user.id, createStudioDTO);
    return ResponseDTO.OK(`Success on update studio with id ${id}`, studio);
  }

  @Delete(':id')
  @Documentation(StudiosDoc.delete)
  async delete(@Req() req: RequestDTO, @Param('id') id: string) {
    const studio = await this.deleteStudioUseCase.execute(+id, req.user.id);
    return ResponseDTO.OK(`Success on delete studio with id ${id}`, studio);
  }
}
