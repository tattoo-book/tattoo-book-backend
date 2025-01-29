import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionDTO<T> extends HttpException {
  description: T;

  constructor(status: number, msg: string, description: T) {
    super({ status: status || 400, message: msg, description }, status || 400);
    this.description = description;
  }

  static NotFound<T>(msg: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.NOT_FOUND, msg, description);
  }

  static BadRequest<T>(msg: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.BAD_REQUEST, msg, description);
  }

  static Conflict<T>(msg: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.BAD_REQUEST, msg, description);
  }

  static Unauthorized<T>(msg: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.UNAUTHORIZED, msg, description);
  }
}
