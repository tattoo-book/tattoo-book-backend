import { StudiosRepository } from '@core/repositories/studios.repositories';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteStudioUseCase {
  constructor(private readonly studiosRepository: StudiosRepository) {}

  async execute(id: number, userId: number) {
    const studio = await this.studiosRepository.findOne({ where: { id: id } });
    if (!studio) throw new NotFoundException(`Studio shop ${id} not found`);
    if (studio.ownerId !== userId) throw new ForbiddenException('Only owners can delete Studio');
    return await this.studiosRepository.softRemove(studio);
  }
}
