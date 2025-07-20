import { StudiosRepository } from '@core/repositories/studios.repositories';
import { ListStudiosDTO } from '@domains/studios/dtos/list-studio.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllStudioUseCase {
  constructor(private readonly studiosRepository: StudiosRepository) {}

  async execute(query: ListStudiosDTO) {
    const studios = await this.studiosRepository.findMany(query);
    return studios.map((studio) => studio.toModel());
  }
}
