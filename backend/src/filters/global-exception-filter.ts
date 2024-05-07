import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

type ErrorResponse = {
  statusCode: number;
  status: string;
  timestamp: string;
  path: string;
  message: string | unknown;
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ConsoleLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception, 'GlobalExceptionFilter');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse: ErrorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      status: HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
      timestamp: new Date().toISOString(),
      path: request.url,
      message: '',
    };

    if (exception instanceof HttpException) {
      errorResponse.statusCode = exception.getStatus();
      errorResponse.status = HttpStatus[exception.getStatus()];
      errorResponse.message = exception.getResponse();
    } else if (exception instanceof PrismaClientKnownRequestError) {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.status = HttpStatus[HttpStatus.BAD_REQUEST];
      errorResponse.message = exception.message;
    } else if (exception instanceof PrismaClientValidationError) {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.status = HttpStatus[HttpStatus.BAD_REQUEST];
      errorResponse.message = exception.message;
    } else if (exception instanceof PrismaClientInitializationError) {
      errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse.status = HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];
      errorResponse.message = exception.message;
    } else {
      errorResponse.message = 'Internal server error';
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
