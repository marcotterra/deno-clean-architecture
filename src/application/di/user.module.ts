import { Module, TokenInjector } from 'danet/mod.ts';

import { UserDITokens } from '~/core/domain/user/di/user-di.tokens.ts';
import { DenoDbUserRepository } from '~/infrastructure/adapter/persistence/denodb/repository/user/denodb-user.repository.ts';
import { CreateUserService } from '~/core/service/user/usecase/create-user.service.ts';
import { UserController } from '~/application/rest/controller/user.controller.ts';

const persistenceProviders = [
  new TokenInjector(
    DenoDbUserRepository,
    UserDITokens.UserRepository,
  ),
];

const useCaseProviders = [
  new TokenInjector(
    CreateUserService,
    UserDITokens.CreateUserUseCase,
  ),
];

const handlerProviders: TokenInjector[] = [];

@Module({
  controllers: [UserController],
  injectables: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class UserModule {}
