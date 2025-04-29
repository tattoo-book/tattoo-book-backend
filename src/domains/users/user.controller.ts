import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWT } from '@tattoo-book-architecture/decorators';
import { RequestDTO, ResponseDTO } from '@tattoo-book-architecture/dtos';
import { AuthGuard } from '@tattoo-book-architecture/guards';
import { JoiPipe } from 'nestjs-joi';
import { CreateUserDTO } from 'src/domains/users/dtos/create-user.dto';
import { ListUserDTO } from 'src/domains/users/dtos/list-user.dto';
import { UpdateUserDto } from 'src/domains/users/dtos/update-user.dto';
import { UsersService } from 'src/domains/users/users.service';
import { SendWellComeEmailUseCase } from './use-cases/users-send-email.service';

@Controller('users')
@ApiTags('Usuários')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersSendEmailService: SendWellComeEmailUseCase,
  ) {}

  @Post()
  @JWT(false)
  @ApiBody({ type: () => CreateUserDTO })
  @ApiOperation({ summary: 'Criação de usuário', description: 'Cria um novo usuario padrão no sistema' })
  @ApiResponse({ status: 200, description: 'Sucesso ao criar usuário' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async create(@Body(JoiPipe) createUserDto: CreateUserDTO) {
    const user = await this.usersService.create(createUserDto);
    this.usersSendEmailService.execute(user);
    return ResponseDTO.OK('Success on create user', user);
  }

  @Get()
  @ApiBody({ type: () => ListUserDTO })
  @ApiOperation({ summary: 'Listagem de usuários', description: 'Listagem de usuário, ordenação e seleção' })
  @ApiResponse({ status: 200, description: 'Sucesso ao listar usuários' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async findAll(@Query(JoiPipe) query: ListUserDTO) {
    const users = await this.usersService.find(query);
    return ResponseDTO.OK('Success on find all user', users);
  }

  @Get('me')
  @ApiOperation({ summary: 'Listagem de perfil', description: 'Lista informações de perfil do usuário' })
  @ApiResponse({ status: 200, description: 'Sucesso ao listar informações de perfil' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @UseGuards(AuthGuard)
  async getInfoMe(@Req() req: RequestDTO) {
    const users = await this.usersService.findOne(req.user.id);
    return ResponseDTO.OK(`Success on find user with id ${req.user.id}`, users);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Id do usuário desejado', type: 'string' })
  @ApiOperation({ summary: 'Listagem de usuário', description: 'Lista usuário individualmente' })
  @ApiResponse({ status: 200, description: 'Sucesso ao buscar usuário' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async findOne(@Param('id') id: string) {
    const users = await this.usersService.findOne(+id);
    return ResponseDTO.OK(`Success on find user with id ${id}`, users);
  }

  @Patch(':id')
  @ApiBody({ description: 'Campos do usuário que serão modificados', type: UpdateUserDto })
  @ApiOperation({ summary: 'Atualizar de usuário', description: 'Atualiza determinados campos de um usuário' })
  @ApiResponse({ status: 200, description: 'Sucesso ao atualizar usuário' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async update(@Param('id') id: string, @Body(JoiPipe) updateUserDto: UpdateUserDto) {
    await this.usersService.update(+id, updateUserDto);
    return ResponseDTO.OK(`Success on update user with id ${id}`, { id: +id, ...updateUserDto });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Id do usuário que será deletado' })
  @ApiOperation({ summary: 'Deleta de usuário', description: 'Faz soft delete do usuário' })
  @ApiResponse({ status: 200, description: 'Sucesso ao deletar usuário' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async delete(@Param('id') id: string) {
    const user = await this.usersService.delete(+id);
    return ResponseDTO.OK(`Success on delete user with id ${id}`, user);
  }
}
