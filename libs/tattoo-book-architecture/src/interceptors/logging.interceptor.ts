import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress || 'unknown';
    Logger.log(`----> ${request.method} ${request.path} from ${request.headers['user-agent'] || ''} IP: ${ip}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => Logger.log(`<---- ${request.method} ${request.path} ... ${Date.now() - now}ms`)));
  }
}
