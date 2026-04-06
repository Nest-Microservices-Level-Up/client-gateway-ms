import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class NatsExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception?.message?.includes('Empty response')) {
      console.log('Error catch from NATS:', exception);
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        status: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'There are not microservice listen this message',
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception?.message || 'Unknow error',
    });
  }
}