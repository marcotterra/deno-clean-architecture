import { IsEmail, IsString } from 'class-validator';
import cuid from 'cuid';
import * as Bcrypt from 'bcrypt/mod.ts';

import { Entity } from '~/core/common/entity/entity.ts';
import { CreateUserEntityPayload } from './types/create-user.type.ts';

export class User extends Entity<string> {
  @IsString()
  private firstName: string;

  @IsString()
  private lastName: string;

  @IsEmail()
  private readonly email: string;

  @IsString()
  private password: string;

  constructor(payload: CreateUserEntityPayload) {
    super();
    this.id = payload?.id ?? cuid();
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
    this.password = payload.password;
  }

  public async hashPassword(): Promise<void> {
    const salt: string = await Bcrypt.genSalt();
    this.password = await Bcrypt.hash(this.password, salt);
    await this.validate();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return Bcrypt.compare(password, this.password);
  }

  public static async build(payload: CreateUserEntityPayload): Promise<User> {
    const user: User = new User(payload);
    await user.hashPassword();
    await user.validate();

    return user;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }
}
