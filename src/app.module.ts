import { Module } from 'danet/mod.ts';

import { ApplicationModule } from './application/application.module.ts';
import { DomainModule } from './domain/domain.module.ts';
import { InfrastructureModule } from './infrastructure/infrastructure.module.ts';

@Module({
  imports: [
    InfrastructureModule,
    DomainModule,
    ApplicationModule,
  ],
})
export class AppModule {}
