import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UseCaseValidatableAdapter } from '~/core/common/adapter/usecase/usecase-validatable.adapter.ts';
import { CreateUserPort } from '~/core/domain/user/port/usecase/create-user.port.ts';

@Exclude()
export class CreateUserAdapter extends UseCaseValidatableAdapter
  implements CreateUserPort {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public firstName!: string;

  @Expose()
  @IsString()
  public lastName!: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public password!: string;

  public static async build(
    payload: CreateUserPort,
  ): Promise<CreateUserAdapter> {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);

    await adapter.validate();

    return adapter;
  }
}
