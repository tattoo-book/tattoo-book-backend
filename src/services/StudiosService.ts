import { Injectable } from '@nestjs/common';
import { CreateStudioDTO } from 'src/common/classes/DTOs/studios/CreateStudioDTO';
import { StudiosRepository } from 'src/repositories/StudiosRepository';

@Injectable()
export class StudiosService {
  constructor(private readonly studiosRepository: StudiosRepository) {}

  async create(createStudioDTO: CreateStudioDTO, userId: number) {
    return await this.studiosRepository.create(createStudioDTO, userId);
  }

  async findAll() {
    return this.studiosRepository.findAll();
  }

  async findOne(id: number) {
    return this.studiosRepository.findOne(id);
  }

  async delete(id: number, userId: number) {
    return await this.studiosRepository.delete(id, userId);
  }
}
