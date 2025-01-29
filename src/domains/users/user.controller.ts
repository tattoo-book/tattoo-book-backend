import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { JWT } from 'src/architecture/decorators/jwt';
import { RequestDTO } from 'src/architecture/dtos/RequestDTO';
import { ResponseDTO } from 'src/architecture/dtos/ResponseDTO';
import { ExceptionDTO } from 'src/architecture/dtos/ResponseErrorDTO';
import { AuthGuard } from 'src/architecture/guards/auth.guard';
import { ErrorHandler } from 'src/architecture/handlers/error.handler';
import { CreateUserDTO } from 'src/domains/users/dtos/create-user.dto';
import { UsersService } from 'src/domains/users/users.service';
import { ListUserDTO } from './dtos/list-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
@ApiTags('Usuários')
export class UsersController {
  static logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Post()
  @JWT(false)
  @UsePipes(new JoiPipe())
  @ApiBody({ type: () => CreateUserDTO })
  @ApiOperation({ summary: 'Criação de usuário', description: 'Cria um novo usuario padrão no sistema' })
  @ApiResponse({ status: 200, description: 'Sucesso ao criar usuário' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async create(@Body() createUserDto: CreateUserDTO) {
    try {
      const user = await this.usersService.create(createUserDto);
      return ResponseDTO.OK('Success on create user', user);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, 'Failed on create user', error);
      throw new ExceptionDTO(error.status, 'Failed on create user', errorDescription);
    }
  }

  @Get()
  @ApiBody({ type: () => ListUserDTO })
  @ApiOperation({ summary: 'Listagem de usuários', description: 'Listagem de usuário, ordenação e seleção' })
  @ApiResponse({ status: 200, description: 'Sucesso ao listar usuários' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async findAll(@Query(JoiPipe) query: ListUserDTO) {
    try {
      const users = await this.usersService.find(query);
      return ResponseDTO.OK('Success on find all user', users);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, 'Failed on find all user', error);
      throw new ExceptionDTO(error.status, 'Failed on find all user', errorDescription);
    }
  }

  @Get('me')
  @ApiOperation({ summary: 'Listagem de perfil', description: 'Lista informações de perfil do usuário' })
  @ApiResponse({ status: 200, description: 'Sucesso ao listar informações de perfil' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  @UseGuards(AuthGuard)
  async getInfoMe(@Req() req: RequestDTO) {
    try {
      const users = await this.usersService.findOne(req.user.id);
      return ResponseDTO.OK(`Success on find user with id ${req.user.id}`, users);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, `Failed on find user`, error);
      throw new ExceptionDTO(error.status, `Failed on find user`, errorDescription);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Id do usuário desejado', type: 'string' })
  @ApiOperation({ summary: 'Listagem de usuário', description: 'Lista usuário individualmente' })
  @ApiResponse({ status: 200, description: 'Sucesso ao buscar usuário' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async findOne(@Param('id') id: string) {
    try {
      const users = await this.usersService.findOne(+id);
      return ResponseDTO.OK(`Success on find user with id ${id}`, users);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, `Failed on find user`, error);
      throw new ExceptionDTO(error.status, `Failed on find user`, errorDescription);
    }
  }

  @Patch(':id')
  @ApiBody({ description: 'Campos do usuário que serão modificados', type: UpdateUserDto })
  @ApiOperation({ summary: 'Atualizar de usuário', description: 'Atualiza determinados campos de um usuário' })
  @ApiResponse({ status: 200, description: 'Sucesso ao atualizar usuário' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async update(@Param('id') id: string, @Body(JoiPipe) updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      return ResponseDTO.OK(`Success on update user with id ${id}`, { id: +id, ...updateUserDto });
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, `Failed on update`, error);
      throw new ExceptionDTO(error.status, `Failed on update`, errorDescription);
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Id do usuário que será deletado' })
  @ApiOperation({ summary: 'Deleta de usuário', description: 'Faz soft delete do usuário' })
  @ApiResponse({ status: 200, description: 'Sucesso ao deletar usuário' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async delete(@Param('id') id: string) {
    try {
      const user = await this.usersService.delete(+id);
      return ResponseDTO.OK(`Success on delete user with id ${id}`, user);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, `Failed on delete`, error);
      throw new ExceptionDTO(error.status, `Failed on delete`, errorDescription);
    }
  }
}
