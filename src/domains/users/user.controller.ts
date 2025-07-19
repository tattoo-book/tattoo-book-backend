import { FindManyUsersUseCase } from '@domains/users/use-cases/find-many/find-many-users.use-case';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWT } from '@tattoo-book-architecture/decorators';
import { RequestDTO, ResponseDTO } from '@tattoo-book-architecture/dtos';
import { UsersEntity } from '@tattoo-book-architecture/entities';
import { JoiPipe } from 'nestjs-joi';
import { Documentation } from 'src/@core/documentation/documentation';
import { UsersDoc } from 'src/@core/documentation/users/users.doc';
import { CreateUserDTO } from 'src/domains/users/dtos/create-user.dto';
import { QueryParamsPaginated } from 'src/domains/users/dtos/list-user.dto';
import { UpdateUserDTO } from 'src/domains/users/dtos/update-user.dto';
import { CreateUserUseCase } from './use-cases/create/create-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete/delete.use-case';
import { FindOneUserUseCase } from './use-cases/findOne/find-one.use-case';
import { UpdateUserUseCase } from './use-cases/update/update.use-case';

@Controller('users')
@ApiTags('Usuários')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly findManyUsersUseCase: FindManyUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @JWT(false)
  @Documentation(UsersDoc.create)
  async create(@Body(JoiPipe) createUserDto: CreateUserDTO) {
    return ResponseDTO.OK('Success on create user', await this.createUserUseCase.execute(createUserDto));
  }

  @Get()
  @Documentation(UsersDoc.findAll)
  async findAll(@Query(JoiPipe) query: QueryParamsPaginated<UsersEntity>) {
    return ResponseDTO.OK('Success on find all user', await this.findManyUsersUseCase.execute(query));
  }

  @Get('me')
  @Documentation(UsersDoc.getInfoMe)
  async getInfoMe(@Req() req: RequestDTO) {
    const user = await this.findOneUserUseCase.execute(req.user.id);
    return ResponseDTO.OK(`Success on find user with id ${req.user.id}`, user);
  }

  @Get(':id')
  @Documentation(UsersDoc.findOne)
  async findOne(@Param('id') id: string) {
    return ResponseDTO.OK(`Success on find user with id ${id}`, await this.findOneUserUseCase.execute(+id));
  }

  @Patch(':id')
  @Documentation(UsersDoc.update)
  async update(@Param('id') id: string, @Body(JoiPipe) updateUserDto: UpdateUserDTO) {
    const userUpdated = await this.updateUserUseCase.execute(+id, updateUserDto);
    return ResponseDTO.OK(`Success on update user with id ${id}`, userUpdated);
  }

  @Delete(':id')
  @Documentation(UsersDoc.delete)
  async delete(@Param('id') id: string) {
    return ResponseDTO.OK(`Success on delete user with id ${id}`, await this.deleteUserUseCase.execute(+id));
  }
}
