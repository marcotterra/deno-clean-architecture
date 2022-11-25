import { User } from '~/domain/entities/user.entity.ts';

export interface UserRepository {
  getUser(userId: string): Promise<User | null>;

  updateUser(userId: string, user: User): Promise<User>;

  create(user: User): Promise<User>;
}
