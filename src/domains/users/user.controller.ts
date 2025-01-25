import { Body, Controller, Delete, Get, Logger, Param, Post, UsePipes } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { ResponseDTO } from 'src/architecture/dtos/ResponseDTO';
import { ResponseErrorDTO } from 'src/architecture/dtos/ResponseErrorDTO';
import { ErrorHandler } from 'src/architecture/handlers/error.handler';
import { CreateUserDTO } from 'src/domains/users/dtos/create-user.dto';
import { UsersService } from 'src/domains/users/users.service';

@Controller('users')
export class UsersController {
  static logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiPipe())
  async create(@Body() createUserDto: CreateUserDTO) {
    try {
      const user = await this.usersService.create(createUserDto);
      return ResponseDTO.OK('Success on create user', user);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, 'Failed on create user', error);
      return new ResponseErrorDTO(error.status, 'Failed on create user', errorDescription);
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return ResponseDTO.OK('Success on find all user', users);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, 'Failed on find all user', error);
      return new ResponseErrorDTO(error.status, 'Failed on find all user', errorDescription);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const users = await this.usersService.findOne(+id);
      return ResponseDTO.OK(`Success on find user with id ${id}`, users);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, `Failed on find user`, error);
      return new ResponseErrorDTO(error.status, `Failed on find user`, errorDescription);
    }
  }

  //   @Put(':id')
  //   async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.usersService.update(+id, updateUserDto);
  //   }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const user = await this.usersService.delete(+id);
      return ResponseDTO.OK(`Success on delete user with id ${id}`, user);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(UsersController.logger, `Failed on delete`, error);
      return new ResponseErrorDTO(error.status, `Failed on delete`, errorDescription);
    }
  }
}
