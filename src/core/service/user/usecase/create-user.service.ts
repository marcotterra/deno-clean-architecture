import { Inject, Injectable } from 'danet/mod.ts';

import { UserDITokens } from '~/core/domain/user/di/user-di.tokens.ts';
import type { UserRepositoryPort } from '~/core/domain/user/port/persistence/user-repository.port.ts';
import { CreateUserUseCase } from '~/core/domain/user/usecase/create-user.usecase.ts';
import { CreateUserPort } from '~/core/domain/user/port/usecase/create-user.port.ts';
import { UserUseCaseDto } from '~/core/domain/user/usecase/dto/user-usecase.dto.ts';
import { CoreAssert } from '~/core/common/util/core-assert.ts';
import { Exception } from '~/core/common/exception/exception.ts';
import { Code } from '~/core/common/code/code.ts';
import { User } from '~/core/domain/user/entity/user.ts';

@Injectable()
export class CreateUserService implements CreateUserUseCase {
  // deno-fmt-ignore
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const doesUserExist: boolean = await this.userRepository
      .countUsers({ email: payload.email })
      .then((amount) => amount > 0);

    CoreAssert.isFalse(
      doesUserExist,
      Exception.build({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'User already exists.',
      }),
    );

    const user: User = await User.build({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });

    await this.userRepository.addUser(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
