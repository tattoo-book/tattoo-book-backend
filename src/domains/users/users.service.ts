import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from 'src/domains/users/dtos/create-user.dto';
import { UserRepository } from 'src/domains/users/repositories/user.repository';
import { ListUserDTO } from './dtos/list-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDTO) {
    const userExist = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (userExist) throw new ConflictException('Email alredy registered');

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async find(query: ListUserDTO) {
    return await this.userRepository.find(query);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return await this.userRepository.softRemove(user);
  }
}
