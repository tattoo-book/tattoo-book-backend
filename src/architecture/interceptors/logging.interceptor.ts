import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    Logger.log(`----> ${request.method} ${request.path}`);

    const now = Date.now();
    return next.handle().pipe(tap(() => Logger.log(`<---- ${request.method} ${request.path} ... ${Date.now() - now}ms`)));
  }
}
