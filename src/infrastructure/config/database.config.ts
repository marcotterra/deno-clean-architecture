function getEnvKey<T>(key: string) {
  return Deno.env.get(key) as T;
}

export class DatabaseConfig {
  public static readonly DB_HOST: string = getEnvKey('DB_HOST');

  public static readonly DB_PORT: number = getEnvKey('DB_PORT');

  public static readonly DB_USERNAME: string = getEnvKey('DB_USERNAME');

  public static readonly DB_PASSWORD: string = getEnvKey('DB_PASSWORD');

  public static readonly DB_NAME: string = getEnvKey('DB_NAME');

  public static readonly DB_LOG_ENABLE: boolean = getEnvKey('DB_LOG_ENABLE');

  public static readonly DB_DEBUG: boolean = getEnvKey('DB_DEBUG');

  public static readonly DB_SYNC: boolean = getEnvKey('DB_SYNC');
}
