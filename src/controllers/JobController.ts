import { Controller, Delete, Get, Logger, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiPipe } from 'nestjs-joi';
import { RequestDTO } from 'src/common/classes/DTOs/RequestDTO';
import { ResponseDTO } from 'src/common/classes/DTOs/ResponseDTO';
import { ResponseErrorDTO } from 'src/common/classes/DTOs/ResponseErrorDTO';
import { AuthGuard } from 'src/common/guards/AuthGuard';
import { ErrorHandler } from 'src/common/handlers/ErrorHandler';
import { JobService } from 'src/services/JobService';

@Controller('jobs')
@UseGuards(AuthGuard)
export class JobController {
  static logger = new Logger('JobController');

  constructor(private jobService: JobService) {}

  @Post()
  @UsePipes(new JoiPipe())
  @UseInterceptors(FileInterceptor('image'))
  async createJob(@Req() req: RequestDTO, @UploadedFile() file: Express.Multer.File) {
    try {
      await this.jobService.create(file, req.user.id);
      return ResponseDTO.OK('Success on create job', null);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(JobController.logger, 'Failed on create job', error);
      return new ResponseErrorDTO(error.status, 'Failed on create job', errorDescription);
    }
  }

  @Get()
  async findAll() {
    try {
      const jobs = await this.jobService.findAll();
      return ResponseDTO.OK('Success on find all jobs', jobs);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(JobController.logger, 'Failed on find all jobs', error);
      return new ResponseErrorDTO(error.status, 'Failed on find all jobs', errorDescription);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const job = await this.jobService.findOne(+id);
      return ResponseDTO.OK(`Success on find job with id ${id}`, job);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(JobController.logger, `Failed on find job with id ${id}`, error);
      return new ResponseErrorDTO(error.status, `Failed on find job with id ${id}`, errorDescription);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const job = await this.jobService.delete(+id);
      return ResponseDTO.OK(`Success on delete job with id ${id}`, null);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(JobController.logger, `Failed on delete job with id ${id}`, error);
      return new ResponseErrorDTO(error.status, `Failed on delete job with id ${id}`, errorDescription);
    }
  }
}
