import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudioDTO } from 'src/domains/studios/dtos/create-studio.dto';
import { StudiosRepository } from 'src/domains/studios/repositories/studios.repositories';

@Injectable()
export class StudiosService {
  constructor(private readonly studiosRepository: StudiosRepository) {}

  async create(createStudioDTO: CreateStudioDTO, userId: number) {
    const studioEntity = this.studiosRepository.create({ ...createStudioDTO, ownerId: userId });
    return await this.studiosRepository.save(studioEntity);
  }

  async findAll() {
    return await this.studiosRepository.find();
  }

  async findOne(id: number) {
    const studio = await this.studiosRepository.findOneBy({ id });
    if (!studio) throw new NotFoundException(`Studio with id ${id} not found`);
    return studio;
  }

  async update(id: number, userId: number, updateStudioDTO: CreateStudioDTO) {
    const studio = await this.studiosRepository.findOne({ where: { id: id } });
    if (!studio) throw new NotFoundException(`Studio ${id} not found`);

    if (studio.ownerId !== userId) throw new ForbiddenException('Only owners can update Studio');
    const studioEntity = this.studiosRepository.create({ ...updateStudioDTO });
    return await this.studiosRepository.save({ ...studio, ...studioEntity });
  }

  async delete(id: number, userId: number) {
    const studio = await this.studiosRepository.findOne({ where: { id: id } });
    if (!studio) throw new NotFoundException(`Studio shop ${id} not found`);
    if (studio.ownerId !== userId) throw new ForbiddenException('Only owners can delete Studio');
    return await this.studiosRepository.softRemove(studio);
  }
}
