import { StudiosRepository } from '@core/repositories/studios.repositories';
import { CreateStudioDTO } from '@domains/studios/dtos/create-studio.dto';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateStudioUseCase {
  constructor(private readonly studiosRepository: StudiosRepository) {}

  async execute(id: number, userId: number, updateStudioDTO: CreateStudioDTO) {
    const studio = await this.studiosRepository.findOne({ where: { id: id } });
    if (!studio) throw new NotFoundException(`Studio ${id} not found`);

    if (studio.ownerId !== userId) throw new ForbiddenException('Only owners can update Studio');
    const studioMerged = this.studiosRepository.merge(studio, updateStudioDTO);
    const studioUpdated = await this.studiosRepository.save(studioMerged);
    return studioUpdated.toModel();
  }
}
