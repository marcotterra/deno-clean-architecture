import {
  ExceptionFilter,
  HttpContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from 'danet/mod.ts';

import { CoreApiResponse } from '~/core/common/api/core-api.response.ts';
import { Exception } from '~/core/common/exception/exception.ts';
import { Code } from '~/core/common/code/code.ts';

@Injectable()
export class BaseExceptionsFilter implements ExceptionFilter {
  constructor() {}

  public catch(error: Error, ctx: HttpContext): void {
    const response = ctx.response;

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message,
    );

    errorResponse = this.handleDanetError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);

    response.status = errorResponse.code;
    response.body = errorResponse;
  }

  private handleDanetError(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(
        error.status,
        error.message,
        null,
      );
    }

    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(
        Code.UNAUTHORIZED_ERROR.code,
        Code.UNAUTHORIZED_ERROR.message,
        null,
      );
    }

    return errorResponse;
  }

  private handleCoreException(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(
        error.code,
        error.message,
        error.data,
      );
    }

    return errorResponse;
  }
}
