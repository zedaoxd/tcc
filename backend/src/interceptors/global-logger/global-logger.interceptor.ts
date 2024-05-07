import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly adapterHost: HttpAdapterHost,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { path, method } = request;
    const statusCode = response.statusCode;

    this.logger.log(`[${method}] ${path}`);

    const startAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          const {
            user: { id },
          } = request;
          this.logger.log(`Accessed by userId: [${id}]`);
        }

        const executionTime = Date.now() - startAt;
        this.logger.log(`Status: ${statusCode} - ${executionTime}ms`);
      }),
    );
  }
}
