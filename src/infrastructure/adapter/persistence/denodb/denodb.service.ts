import { Injectable } from 'danet/mod.ts';
import { OnAppBootstrap, OnAppClose } from 'danet/src/hook/interfaces.ts';
import { Database, PostgresConnector } from 'denodb/mod.ts';

import { DatabaseConfig } from '~/infrastructure/config/database.config.ts';
import { UserModel } from '~/infrastructure/adapter/persistence/denodb/models/user.model.ts';

@Injectable()
export class DenodbService implements OnAppBootstrap, OnAppClose {
  private database!: Database;

  async onAppBootstrap() {
    await this.connect();
  }

  async onAppClose() {
    await this.database.close();
  }

  private async connect() {
    const connector = new PostgresConnector({
      database: DatabaseConfig.DB_NAME,
      host: DatabaseConfig.DB_HOST,
      username: DatabaseConfig.DB_USERNAME,
      password: DatabaseConfig.DB_PASSWORD,
      port: DatabaseConfig.DB_PORT,
    });

    this.database = new Database({
      connector,
      debug: DatabaseConfig.DB_DEBUG,
    });

    this.database
      .link([
        UserModel,
      ]);

    if (String(DatabaseConfig.DB_SYNC) === 'true') {
      await this.database.sync();
    }
  }
}
