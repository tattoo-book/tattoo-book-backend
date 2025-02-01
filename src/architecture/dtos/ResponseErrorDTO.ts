import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionDTO<T> extends HttpException {
  description: T;

  constructor(status: number, reason: string, msg: string | undefined, description: T) {
    super({ status: status || 400, reason: reason, message: msg, description }, status || 400);
    this.description = description;
  }

  static NotFound<T>(reason: string, msg: string | undefined, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.NOT_FOUND, reason, msg, description);
  }

  static BadRequest<T>(reason: string, msg: string | undefined, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.BAD_REQUEST, reason, msg, description);
  }

  static Conflict<T>(reason: string, msg: string | undefined, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.BAD_REQUEST, reason, msg, description);
  }

  static Unauthorized<T>(reason: string, msg: string | undefined, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.UNAUTHORIZED, reason, msg, description);
  }
}
