import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWT } from '@tattoo-book-architecture/decorators';
import { RequestDTO, ResponseDTO } from '@tattoo-book-architecture/dtos';
import { JoiPipe } from 'nestjs-joi';
import { Documentation } from 'src/@core/documentation/documentation';
import { UsersDoc } from 'src/@core/documentation/users/users.doc';
import { CreateUserDTO } from 'src/domains/users/dtos/create-user.dto';
import { ListUserDTO } from 'src/domains/users/dtos/list-user.dto';
import { UpdateUserDto } from 'src/domains/users/dtos/update-user.dto';
import { UsersService } from 'src/domains/users/users.service';
import { CreateUserUseCase } from './use-cases/create/create-user.use-case';
import { SendWellComeEmailUseCase } from './use-cases/users-send-email.service';

@Controller('users')
@ApiTags('Usuários')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersSendEmailService: SendWellComeEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  @JWT(false)
  @Documentation(UsersDoc.create)
  async create(@Body(JoiPipe) createUserDto: CreateUserDTO) {
    const user = await this.createUserUseCase.execute(createUserDto);
    this.usersSendEmailService.execute(user);
    return ResponseDTO.OK('Success on create user', user);
  }

  @Get()
  @Documentation(UsersDoc.findAll)
  async findAll(@Query(JoiPipe) query: ListUserDTO) {
    return ResponseDTO.OK('Success on find all user', await this.usersService.find(query));
  }

  @Get('me')
  @Documentation(UsersDoc.getInfoMe)
  async getInfoMe(@Req() req: RequestDTO) {
    return ResponseDTO.OK(`Success on find user with id ${req.user.id}`, await this.usersService.findOne(req.user.id));
  }

  @Get(':id')
  @Documentation(UsersDoc.findOne)
  async findOne(@Param('id') id: string) {
    return ResponseDTO.OK(`Success on find user with id ${id}`, await this.usersService.findOne(+id));
  }

  @Patch(':id')
  @Documentation(UsersDoc.update)
  async update(@Param('id') id: string, @Body(JoiPipe) updateUserDto: UpdateUserDto) {
    return ResponseDTO.OK(`Success on update user with id ${id}`, await this.usersService.update(+id, updateUserDto));
  }

  @Delete(':id')
  @Documentation(UsersDoc.delete)
  async delete(@Param('id') id: string) {
    return ResponseDTO.OK(`Success on delete user with id ${id}`, await this.usersService.delete(+id));
  }
}
