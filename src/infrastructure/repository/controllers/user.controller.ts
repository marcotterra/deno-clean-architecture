import { Controller, Get } from 'danet/mod.ts';

@Controller('user')
export class UserController {
  @Get()
  index(): string {
    return {
      'mat': 'This action returns all todo',
    };
  }
}
