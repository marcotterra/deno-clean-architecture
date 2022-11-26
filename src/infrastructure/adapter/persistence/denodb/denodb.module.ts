import { Module } from 'danet/mod.ts';
import { DenodbService } from '~/infrastructure/adapter/persistence/denodb/denodb.service.ts';

@Module({
  injectables: [DenodbService],
  controllers: [],
})
export class DenodbModule {}
