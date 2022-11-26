import * as jwt from 'djwt/mod.ts';

import { JWTPort } from '~/core/domain/auth/port/persistence/jwt.port.ts';
import { AppConfig } from '~/infrastructure/config/app.config.ts';

export class JWTRepository implements JWTPort {
  public async sign(payload: jwt.Payload) {
    const key = await this.getSecretKey();

    return jwt.create({ alg: 'HS512', typ: 'JWT' }, payload, key);
  }

  public async verify(token: string) {
    const key = await this.getSecretKey();

    return jwt.verify(token, key);
  }

  public decode(token: string) {
    return jwt.decode(token);
  }

  private async getSecretKey(): Promise<CryptoKey> {
    const jwkEcKey = JSON.parse(AppConfig.APP_JWT_KEY) as JsonWebKey;

    return crypto.subtle.importKey(
      'jwk',
      jwkEcKey,
      { name: 'HMAC', hash: 'SHA-512' },
      true,
      ['sign', 'verify'],
    );
  }
}
