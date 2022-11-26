import { Body, Controller, Inject, Post } from 'danet/mod.ts';
import { ReturnedType } from 'danet_swagger/decorators.ts';

import { CoreApiResponse } from '~/core/common/api/core-api.response.ts';
import { HttpRestApiLogInParam } from '~/application/rest/controller/documentation/auth/login.param.ts';
import { AuthDITokens } from '~/core/domain/auth/di/auth-di.tokens.ts';
import type { LoginUseCase } from '~/core/domain/auth/usecase/login.usecase.ts';
import { HttpRestApiLoggedInUserResponse } from '~/application/rest/controller/documentation/auth/login.response.ts';

@Controller('auth')
export class AuthController {
  // deno-fmt-ignore
  constructor(
    @Inject(AuthDITokens.LoginUseCase)
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('login')
  @ReturnedType(HttpRestApiLoggedInUserResponse)
  public async login(
    @Body() body: HttpRestApiLogInParam,
  ): Promise<CoreApiResponse<HttpRestApiLoggedInUserResponse>> {
    const authUser = await this.loginUseCase.execute(body);

    return CoreApiResponse.success(authUser);
  }
}
