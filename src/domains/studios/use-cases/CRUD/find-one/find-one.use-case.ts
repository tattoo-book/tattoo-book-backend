import { StudiosRepository } from '@core/repositories/studios.repositories';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindOneStudioUseCase {
  constructor(private readonly studiosRepository: StudiosRepository) {}

  async execute(id: number) {
    const studio = await this.studiosRepository.findOneBy({ id });
    if (!studio) throw new NotFoundException(`Studio with id ${id} not found`);
    return studio.toModel();
  }
}
