import { UserRepository } from '~/domain/ports/user.repository.ts';
import { User } from '~/domain/entities/user.entity.ts';
import { UserMapper } from '~/infrastructure/mapper/mod.ts';
import { PrismaService } from './prisma.service.ts';

export class UserRepositoryPrisma implements UserRepository {
  constructor(private prisma: PrismaService);

  async getUser(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user) return UserMapper.toDomain(user);

    return null;
  }
  updateUser(userId: string, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  create(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
