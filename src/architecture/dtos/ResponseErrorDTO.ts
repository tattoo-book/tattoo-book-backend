import { HttpException } from '@nestjs/common';

export class ResponseErrorDTO<T> extends HttpException {
  description: T;

  constructor(status: number, msg: string, description: T) {
    super({ status, message: msg, description }, status || 400);
    this.description = description;
  }
}
