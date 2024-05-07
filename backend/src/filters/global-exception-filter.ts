import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private readonly logger: ConsoleLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);

    const { httpAdapter } = this.adapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if ('user' in request) {
      this.logger.warn(`Route accessed by userId: ${request.user.user.id}`);
    }

    const { body, status } =
      exception instanceof HttpException
        ? { status: exception.getStatus(), body: exception.getResponse() }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              message: 'Internal server error',
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
            },
          };

    httpAdapter.reply(response, body, status);
  }
}
