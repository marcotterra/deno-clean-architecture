import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UseCaseValidatableAdapter } from '~/core/common/adapter/usecase/usecase-validatable.adapter.ts';
import { LoginPort } from '~/core/domain/auth/port/usecase/login.port.ts';

@Exclude()
export class LoginAdapter extends UseCaseValidatableAdapter
  implements LoginPort {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public password!: string;

  public static async build(
    payload: LoginPort,
  ): Promise<LoginAdapter> {
    const adapter: LoginAdapter = plainToClass(LoginAdapter, payload);

    await adapter.validate();

    return adapter;
  }
}
