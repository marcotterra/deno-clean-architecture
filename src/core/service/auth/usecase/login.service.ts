import { Inject, Injectable } from 'danet/mod.ts';

import { UserDITokens } from '~/core/domain/user/di/user-di.tokens.ts';
import type { UserRepositoryPort } from '~/core/domain/user/port/persistence/user-repository.port.ts';
import type { JWTPort } from '~/core/domain/auth/port/persistence/jwt.port.ts';
import { LoginUseCase } from '~/core/domain/auth/usecase/login.usecase.ts';
import { LoginPort } from '~/core/domain/auth/port/usecase/login.port.ts';
import { CoreAssert } from '~/core/common/util/core-assert.ts';
import { Exception } from '~/core/common/exception/exception.ts';
import { Code } from '~/core/common/code/code.ts';
import { AuthDITokens } from '~/core/domain/auth/di/auth-di.tokens.ts';

@Injectable()
export class LoginService implements LoginUseCase {
  // deno-fmt-ignore
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,

    @Inject(AuthDITokens.JWTRepository)
    private readonly jwtRepository: JWTPort
  ) {}

  public async execute(
    payload: LoginPort,
  ): Promise<{ id: string; accessToken: string } | undefined> {
    const foundUser = await this
      .userRepository
      .findUser({ email: payload.email });

    if (foundUser) {
      const isValidPassword: boolean = await foundUser
        .comparePassword(payload.password);

      if (isValidPassword) {
        const payload = { id: foundUser.getId() };

        return {
          id: payload.id,
          accessToken: await this.jwtRepository.sign(payload),
        };
      }
    }

    // only throw if code reach here
    CoreAssert.isFalse(
      true,
      Exception.build({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Email or password is invalid.',
      }),
    );
  }
}
