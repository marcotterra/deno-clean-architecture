import { Module, TokenInjector } from 'danet/mod.ts';
import { DomainModule } from '~/domain/domain.module.ts';
import { UserRepositoryPrisma } from '../infrastructure/repository/prisma/user.repository.prisma.ts';
import { UserService } from './services/user.service.ts';

@Module({
  imports: [DomainModule],
  injectables: [
    new TokenInjector(UserRepositoryPrisma, 'UserRepository'),
    UserService,
  ],
})
export class ApplicationModule {}
