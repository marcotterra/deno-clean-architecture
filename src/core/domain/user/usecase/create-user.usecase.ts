import { UseCase } from '~/core/common/usecase/usecase.ts';
import { CreateUserPort } from '~/core/domain/user/port/usecase/create-user.port.ts';
import { UserUseCaseDto } from '~/core/domain/user/usecase/dto/user-usecase.dto.ts';

// deno-lint-ignore no-empty-interface
export interface CreateUserUseCase
  extends UseCase<CreateUserPort, UserUseCaseDto> {}
