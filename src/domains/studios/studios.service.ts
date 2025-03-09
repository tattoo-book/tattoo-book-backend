import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudioDTO } from 'src/domains/studios/dtos/create-studio.dto';
import { ListStudiosDTO } from 'src/domains/studios/dtos/list-studio.dto';
import { StudiosRepository } from 'src/domains/studios/repositories/studios.repositories';

@Injectable()
export class StudiosService {
  constructor(private readonly studiosRepository: StudiosRepository) {}

  async create(createStudioDTO: CreateStudioDTO, userId: number) {
    const studioEntity = this.studiosRepository.create({ ...createStudioDTO, ownerId: userId });
    const studio = await this.studiosRepository.save(studioEntity);
    return studio.toModel();
  }

  async findAll(query: ListStudiosDTO) {
    const studios = await this.studiosRepository.findMany(query);
    return studios.map((studio) => studio.toModel());
  }

  async findOne(id: number) {
    const studio = await this.studiosRepository.findOneBy({ id });
    if (!studio) throw new NotFoundException(`Studio with id ${id} not found`);
    return studio.toModel();
  }

  async update(id: number, userId: number, updateStudioDTO: CreateStudioDTO) {
    const studio = await this.studiosRepository.findOne({ where: { id: id } });
    if (!studio) throw new NotFoundException(`Studio ${id} not found`);

    if (studio.ownerId !== userId) throw new ForbiddenException('Only owners can update Studio');
    const studioMerged = this.studiosRepository.merge(studio, updateStudioDTO);
    const studioUpdated = await this.studiosRepository.save(studioMerged);
    return studioUpdated.toModel();
  }

  async delete(id: number, userId: number) {
    const studio = await this.studiosRepository.findOne({ where: { id: id } });
    if (!studio) throw new NotFoundException(`Studio shop ${id} not found`);
    if (studio.ownerId !== userId) throw new ForbiddenException('Only owners can delete Studio');
    return await this.studiosRepository.softRemove(studio);
  }
}
