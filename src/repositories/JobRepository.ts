import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobsEntity } from 'src/entities/JobsEntity';
import { Repository } from 'typeorm';

@Injectable()
export class JobRepository {
  constructor(@InjectRepository(JobsEntity) private readonly jobRepository: Repository<JobsEntity>) {}

  async create(file: Express.Multer.File, tattooArtistId: number) {
    const jobEntity = this.jobRepository.create({ image: file.buffer, tattooArtistId });
    return await this.jobRepository.save(jobEntity);
  }

  async findAll() {
    return await this.jobRepository.find();
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOneBy({ id });
    if (!job) throw new NotFoundException(`Job with id ${id} not found`);
    return job;
  }

  async delete(id: number) {
    const job = await this.jobRepository.findOneBy({ id });
    if (!job) throw new NotFoundException(`Job with id ${id} not found`);
    return await this.jobRepository.softRemove(job);
  }
}
