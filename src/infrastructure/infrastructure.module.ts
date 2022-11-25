import { Module } from 'danet/mod.ts';

import { ApplicationModule } from '~/application/application.module.ts';
import { PrismaModule } from './repository/prisma/prisma.module.ts';
import { UserController } from './repository/controllers/mod.ts';
import { AppController } from './repository/controllers/app.controller.ts';

@Module({
  imports: [PrismaModule, ApplicationModule],
  controllers: [AppController, UserController],
  injectables: [],
})
export class InfrastructureModule {}
