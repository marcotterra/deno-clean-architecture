type UserProps2 = {
  id: string;
  name: string;
  email: string;
  encryptedPassword?: string;
};

export type UserProps = ReturnType<() => User>;

export class User {
  public id: string;
  public name: string;
  public email: string;
  public encryptedPassword?: string;

  constructor(user: UserProps) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;

    if (user?.encryptedPassword) {
      this.encryptedPassword = user.encryptedPassword;
    }
  }
}
