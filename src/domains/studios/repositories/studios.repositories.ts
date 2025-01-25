import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudioDTO } from 'src/domains/studios/dtos/CreateStudioDTO';
import { StudiosEntity } from 'src/domains/studios/entities/studios.entitty';
import { Repository } from 'typeorm';

@Injectable()
export class StudiosRepository {
  constructor(@InjectRepository(StudiosEntity) private readonly studioRepository: Repository<StudiosEntity>) {}

  async create(createStudioDTO: CreateStudioDTO, userId: number) {
    const studioEntity = this.studioRepository.create({ ...createStudioDTO, ownerId: userId });
    return await this.studioRepository.save(studioEntity);
  }

  async findAll() {
    return await this.studioRepository.find();
  }

  async findOne(id: number) {
    const studio = await this.studioRepository.findOneBy({ id });
    if (!studio) throw new NotFoundException(`Studio with id ${id} not found`);
    return studio;
  }

  async delete(id: number, userId: number) {
    const studio = await this.studioRepository.findOne({ where: { id: id } });
    if (!studio) throw new NotFoundException(`Studio shop ${id} not found`);
    if (studio.ownerId !== userId) throw new ForbiddenException('Only owners can delete Studio');
    return await this.studioRepository.softRemove(studio);
  }
}
