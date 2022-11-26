import { AuthGuard, Inject, Injectable } from 'danet/mod.ts';
import type { HttpContext } from 'danet/mod.ts';

import { AuthDITokens } from '~/core/domain/auth/di/auth-di.tokens.ts';
import type { CurrentUserUseCase } from '~/core/domain/auth/usecase/currentuser.usecase.ts';

@Injectable()
export class JwtAuthGuard implements AuthGuard {
  // deno-fmt-ignore
  constructor(
    @Inject(AuthDITokens.CurrentUserUseCase)
    private readonly currentUserUseCase: CurrentUserUseCase,
  ) {}

  async canActivate(context: HttpContext): Promise<boolean> {
    const header = context.request.headers.get('Authorization');

    const token = header
      ?.split(' ')
      ?.at(-1) ??
      '';

    const currentUser = await this.currentUserUseCase.execute({ token });

    context.state.user = currentUser;

    return true;
  }
}
