import { Inject, Injectable } from 'danet/mod.ts';

import { CurrentUserUseCase } from '~/core/domain/auth/usecase/currentuser.usecase.ts';
import { CurrentUserAuthPort } from '~/core/domain/auth/port/usecase/currentuser.port.ts';
import { UserUseCaseDto } from '~/core/domain/user/usecase/dto/user-usecase.dto.ts';

import { UserDITokens } from '~/core/domain/user/di/user-di.tokens.ts';
import type { UserRepositoryPort } from '~/core/domain/user/port/persistence/user-repository.port.ts';
import type { JWTPort } from '~/core/domain/auth/port/persistence/jwt.port.ts';
import { AuthDITokens } from '~/core/domain/auth/di/auth-di.tokens.ts';

import { CoreAssert } from '~/core/common/util/core-assert.ts';
import { Exception } from '~/core/common/exception/exception.ts';
import { Code } from '~/core/common/code/code.ts';

@Injectable()
export class CurrentUserService implements CurrentUserUseCase {
  // deno-fmt-ignore
  constructor(
      @Inject(UserDITokens.UserRepository)
      private readonly userRepository: UserRepositoryPort,

      @Inject(AuthDITokens.JWTRepository)
      private readonly jwtRepository: JWTPort
    ) {}

  async execute(
    { token }: CurrentUserAuthPort,
  ): Promise<UserUseCaseDto | null> {
    CoreAssert.isTruthy(
      Boolean(token),
      Exception.build({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'Auth token isn\'t present.',
      }),
    );

    const userToken = await this.jwtRepository.verify(token);

    const userId = userToken?.id ? String(userToken.id) : null;

    CoreAssert.isTruthy(
      typeof userId === 'string',
      Exception.build({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'Invalid JWT Token.',
      }),
    );

    const currentUser = await this
      .userRepository
      .findUser({ id: userId });

    CoreAssert.isTruthy(
      currentUser,
      Exception.build({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'Invalid JWT Token.',
      }),
    );

    return UserUseCaseDto.newFromUser(currentUser);
  }
}
