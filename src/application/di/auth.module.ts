import { Module, TokenInjector } from 'danet/mod.ts';

import { AuthController } from '~/application/rest/controller/auth.controller.ts';
import { AuthDITokens } from '~/core/domain/auth/di/auth-di.tokens.ts';
import { LoginService } from '~/core/service/auth/usecase/login.service.ts';
import { JWTRepository } from '~/infrastructure/adapter/persistence/jwt/jwt.repository.ts';
import { CurrentUserService } from '~/core/service/auth/usecase/currentuser.service.ts';

const persistenceProviders = [
  new TokenInjector(
    JWTRepository,
    AuthDITokens.JWTRepository,
  ),
];

const useCaseProviders = [
  new TokenInjector(
    LoginService,
    AuthDITokens.LoginUseCase,
  ),
  new TokenInjector(
    CurrentUserService,
    AuthDITokens.CurrentUserUseCase,
  ),
];

@Module({
  controllers: [AuthController],
  injectables: [
    ...persistenceProviders,
    ...useCaseProviders,
  ],
})
export class AuthModule {}
