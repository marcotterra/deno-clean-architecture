import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseFilter,
  UseGuard,
} from 'danet/mod.ts';

import { UserDITokens } from '~/core/domain/user/di/user-di.tokens.ts';
import type { CreateUserUseCase } from '~/core/domain/user/usecase/create-user.usecase.ts';
import { CreateUserAdapter } from '~/infrastructure/adapter/usecase/user/create-user.adapter.ts';
import { CreateUserBody } from '~/application/rest/controller/documentation/user/create-user.param.ts';
import { CoreApiResponse } from '~/core/common/api/core-api.response.ts';
import { UserUseCaseDto } from '~/core/domain/user/usecase/dto/user-usecase.dto.ts';
import { BaseExceptionsFilter } from '~/application/rest/exception-filter/base-exceptions.filter.ts';
import { JwtAuthGuard } from '~/application/rest/guards/jwtauth.guard.ts';
import { AuthUser } from '~/application/rest/decorators/decorators.ts';

@Controller('users')
@UseFilter(BaseExceptionsFilter)
export class UserController {
  // deno-fmt-ignore
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('')
  public async createAccount(
    @Body() body: CreateUserBody,
  ): Promise<CoreApiResponse<UserUseCaseDto>> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.build({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    });

    const createdUser: UserUseCaseDto = await this
      .createUserUseCase
      .execute(adapter);

    return CoreApiResponse.success(createdUser);
  }

  @Get('')
  @UseGuard(JwtAuthGuard)
  public me(
    @AuthUser() user: UserUseCaseDto,
  ) {
    return CoreApiResponse.success({ user });
  }
}
