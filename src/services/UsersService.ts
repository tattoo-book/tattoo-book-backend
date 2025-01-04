import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/common/classes/DTOs/users/CreateUserDTO';
import { UserRepository } from 'src/repositories/UserRepository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDTO) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  //   update(id: number, updateUserDto: UpdateUserDto): User {
  //     const userIndex = this.users.findIndex((user) => user.id === id);
  //     this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
  //     return this.users[userIndex];
  //   }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
