import { Injectable } from 'danet/mod.ts';
import { OnAppBootstrap, OnAppClose } from 'danet/src/hook/interfaces.ts';
import { PrismaClient } from '@prisma/client/deno/edge.ts';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnAppBootstrap, OnAppClose {
  async onAppBootstrap() {
    await this.$connect();
  }

  async onAppClose() {
    await this.$disconnect();
  }
}
