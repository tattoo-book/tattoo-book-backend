import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionDTO<T> extends HttpException {
  public reason: string | undefined;
  public description: T | undefined;

  constructor(status: number, reason: string, description: T | undefined) {
    super(
      { status: status || 400, reason: reason, description },
      status || 400,
    );
    this.description = description;
    this.reason = reason;
  }

  public static NotFound<T>(reason: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.NOT_FOUND, reason, description);
  }

  public static BadRequest<T>(reason: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.BAD_REQUEST, reason, description);
  }

  public static Conflict<T>(reason: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.BAD_REQUEST, reason, description);
  }

  public static Unauthorized<T>(reason: string, description?: T) {
    return new ExceptionDTO<T>(HttpStatus.UNAUTHORIZED, reason, description);
  }

  public static status(status: number) {
    return new BuilderExceptionDTO(status);
  }
}

class BuilderExceptionDTO<T> {
  private readonly status: number;
  private customReason: string;
  private customDescription: string;

  constructor(status: number) {
    this.status = status;
  }

  public reason(reason: string) {
    this.customReason = reason;
    return this;
  }

  public description(description: string) {
    this.customDescription = description;
    return this;
  }

  public build() {
    return new ExceptionDTO(
      this.status,
      this.customReason,
      this.customDescription,
    );
  }
}
