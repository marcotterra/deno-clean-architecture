import { createParamDecorator, HttpContext } from 'danet/mod.ts';

export const AuthUser = () =>
  createParamDecorator((context: HttpContext) => {
    return context.state.user;
  })();
