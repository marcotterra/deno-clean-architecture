function getEnvKey<T>(key: string) {
  return Deno.env.get(key) as T;
}

export class AppConfig {
  public static readonly APP_PORT: number = getEnvKey('APP_PORT');

  public static readonly APP_JWT_KEY: string = getEnvKey('APP_JWT_KEY');
}
