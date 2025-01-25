import { Injectable } from '@nestjs/common';
import { CreateStudioDTO } from 'src/domains/studios/dtos/CreateStudioDTO';
import { StudiosRepository } from 'src/domains/studios/repositories/studios.repositories';

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
