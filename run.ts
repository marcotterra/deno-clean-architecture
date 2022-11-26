import { Application } from './src/application/main.ts';

async function run() {
  const app = Application.build();
  await app.run();
}

await run();
