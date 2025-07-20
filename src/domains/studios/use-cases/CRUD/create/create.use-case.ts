import { StudiosRepository } from '@core/repositories/studios.repositories';
import { CreateStudioDTO } from '@domains/studios/dtos/create-studio.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateStudioUseCase {
  constructor(private readonly studiosRepository: StudiosRepository) {}

  async execute(createStudioDTO: CreateStudioDTO, userId: number) {
    const studioEntity = this.studiosRepository.create({ ...createStudioDTO, ownerId: userId });
    const studio = await this.studiosRepository.save(studioEntity);
    return studio.toModel();
  }
}
