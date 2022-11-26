import * as jwt from 'djwt/mod.ts';

export interface JWTPort {
  sign(payload: jwt.Payload): Promise<string>;

  verify(token: string): Promise<jwt.Payload>;

  decode(
    token: string,
  ): [header: unknown, payload: unknown, signature: Uint8Array];
}
