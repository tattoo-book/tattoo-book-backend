import { Injectable } from '@nestjs/common';
import { JobRepository } from 'src/repositories/JobRepository';

@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

  async create(file: Express.Multer.File, tattooArtistId: number) {
    return await this.jobRepository.create(file, tattooArtistId);
  }

  async findAll() {
    return await this.jobRepository.findAll();
  }

  async findOne(id: number) {
    return await this.jobRepository.findOne(id);
  }

  async delete(id: number) {
    return await this.jobRepository.delete(id);
  }
}
