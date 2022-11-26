import { UseCase } from '~/core/common/usecase/usecase.ts';
import { CurrentUserAuthPort } from '~/core/domain/auth/port/usecase/currentuser.port.ts';
import { UserUseCaseDto } from '~/core/domain/user/usecase/dto/user-usecase.dto.ts';

// deno-lint-ignore no-empty-interface
export interface CurrentUserUseCase
  extends UseCase<CurrentUserAuthPort, UserUseCaseDto | null> {}
