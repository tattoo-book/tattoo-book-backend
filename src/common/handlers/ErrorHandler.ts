import { Logger } from '@nestjs/common';

export class ErrorHandler {
  static execute(logger: Logger, msg: string, err: any) {
    logger.error(msg + ': ' + err);
    return err.response && err.response.message ? err.response.message : null;
  }
}
