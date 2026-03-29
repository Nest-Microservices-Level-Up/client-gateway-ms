

import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if(
      rpcError &&
      typeof rpcError === "object" &&
      "status" in rpcError &&
      "message" in rpcError
    ){
      const err = rpcError as { status?: unknown; message?: unknown; [key: string]: unknown };
      const statusNum = Number(err.status);
      const status = Number.isNaN(statusNum) ? 400 : statusNum;
      return response.status(status).json(err);
    }

    response.status(400).json({
      status: 400,
      message: rpcError
    })

  }
}
