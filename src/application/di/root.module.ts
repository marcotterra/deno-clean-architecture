import { Module } from 'danet/mod.ts';

import { InfrastructureModule } from '~/application/di/infrastructure.module.ts';
import { AuthModule } from '~/application/di/auth.module.ts';
import { UserModule } from '~/application/di/user.module.ts';

@Module({
  imports: [
    InfrastructureModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
})
export class RootModule {}
