import { Module } from 'danet/mod.ts';

import { DenodbModule } from '~/infrastructure/adapter/persistence/denodb/denodb.module.ts';

@Module({
  imports: [
    DenodbModule,
  ],
  controllers: [],
})
export class InfrastructureModule {}
