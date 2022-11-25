import { Controller, Get } from 'danet/mod.ts';

@Controller('')
export class AppController {
  @Get()
  index() {
    const now = new Date().toISOString();
    return { now };
  }
}
