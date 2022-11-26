import { User } from '~/core/domain/user/entity/user.ts';
import { UserModel } from '~/infrastructure/adapter/persistence/denodb/models/user.model.ts';

export class DenoDbUserMapper {
  public static toOrmModel(domainUser: User) {
    const modelUser: UserModel = new UserModel();

    modelUser.id = domainUser.getId();
    modelUser.firstName = domainUser.getFirstName();
    modelUser.lastName = domainUser.getLastName();
    modelUser.email = domainUser.getEmail();
    modelUser.password = domainUser.getPassword();

    return modelUser;
  }

  public static toOrmModels(domainUsers: User[]): UserModel[] {
    return domainUsers.map((domainUser) => this.toOrmModel(domainUser));
  }

  public static toDomainModel(ormUser: UserModel): User {
    const domainUser: User = new User({
      firstName: ormUser.firstName,
      lastName: ormUser.lastName,
      email: ormUser.email,
      password: ormUser.password,
      id: ormUser.id,
    });

    return domainUser;
  }

  public static toDomainModels(ormUsers: UserModel[]): User[] {
    return ormUsers.map((ormUser) => this.toDomainModel(ormUser));
  }
}
