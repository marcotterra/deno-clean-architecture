import { Module } from 'danet/mod.ts';
import { PrismaService } from './prisma.service.ts';

@Module({
  injectables: [PrismaService],
})
export class PrismaModule {}
