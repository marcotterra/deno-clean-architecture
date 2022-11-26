import { DanetApplication } from 'danet/mod.ts';
import { load } from 'dotenv/mod.ts';
import { SpecBuilder, SwaggerModule } from 'danet_swagger/mod.ts';

import { RootModule } from '~/application/di/root.module.ts';
import { loggerMiddleware } from '~/application/rest/middlewares/logger.middleware.ts';
import { AppConfig } from '~/infrastructure/config/app.config.ts';

export class Application {
  private readonly port = AppConfig.APP_PORT;

  public async run() {
    await load({ export: true });
    const application = new DanetApplication();
    await application.init(RootModule);
    application.addGlobalMiddlewares(loggerMiddleware);

    const spec = new SpecBuilder()
      .setTitle('Deno Clean Api')
      .setDescription('Using danet :)')
      .setVersion('0.1')
      .build();

    const document = await SwaggerModule.createDocument(application, spec);
    SwaggerModule.setup('api', application, document);

    await application.listen(this.port);
  }

  public static build(): Application {
    return new Application();
  }
}
