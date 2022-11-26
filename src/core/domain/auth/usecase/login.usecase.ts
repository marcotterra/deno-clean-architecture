import { UseCase } from '~/core/common/usecase/usecase.ts';
import { LoginPort } from '~/core/domain/auth/port/usecase/login.port.ts';

// deno-lint-ignore no-empty-interface
export interface LoginUseCase
  extends UseCase<LoginPort, { id: string; accessToken: string } | undefined> {}
