import type { Optional } from '~/core/common/type/common-types.ts';
import { User } from '~/core/domain/user/entity/user.ts';

export interface UserRepositoryPort {
  findUser(by: { id?: string; email?: string }): Promise<Optional<User>>;

  countUsers(by: { id?: string; email?: string }): Promise<number>;

  addUser(user: User): Promise<{ id: string }>;

  updateUser(user: User): Promise<void>;
}
