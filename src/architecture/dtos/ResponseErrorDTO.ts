import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionDTO<T> extends HttpException {
  description: T;

  constructor(status: number, reason: string, description: T) {
    super({ status: status || 400, reason: reason, description }, status || 400);
    this.description = description;
  }

  static NotFound<T>(reason: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.NOT_FOUND, reason, description);
  }

  static BadRequest<T>(reason: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.BAD_REQUEST, reason, description);
  }

  static Conflict<T>(reason: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.BAD_REQUEST, reason, description);
  }

  static Unauthorized<T>(reason: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.UNAUTHORIZED, reason, description);
  }
}
