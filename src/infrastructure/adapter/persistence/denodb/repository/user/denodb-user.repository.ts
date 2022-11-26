import { Values } from 'denodb/lib/data-types.ts';

import { UserRepositoryPort } from '~/core/domain/user/port/persistence/user-repository.port.ts';
import { Optional } from '~/core/common/type/common-types.ts';
import { User } from '~/core/domain/user/entity/user.ts';
import { UserModel } from '~/infrastructure/adapter/persistence/denodb/models/user.model.ts';
import { DenoDbUserMapper } from '~/infrastructure/adapter/persistence/denodb/models/mapper/denodb-user.mapper.ts';

export class DenoDbUserRepository implements UserRepositoryPort {
  async findUser(
    by: { id?: string | undefined; email?: string | undefined },
  ): Promise<Optional<User>> {
    let domainEntity: Optional<User>;

    const query = this.extendQueryWithByProperties(by);

    const ormEntity = await UserModel //
      .where(query)
      .first() as Optional<UserModel>;

    if (ormEntity) {
      domainEntity = DenoDbUserMapper.toDomainModel(ormEntity);
    }

    return domainEntity;
  }

  async countUsers(
    by: { id?: string | undefined; email?: string | undefined },
  ): Promise<number> {
    const query = this.extendQueryWithByProperties(by);

    return UserModel.where(query).count();
  }

  async addUser(user: User): Promise<{ id: string }> {
    const userModel = DenoDbUserMapper.toOrmModel(user) as Values;

    const operation = await UserModel.create(userModel);

    return {
      id: operation?.id?.toString()!,
    };
  }

  updateUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private extendQueryWithByProperties(
    by: { id?: string; email?: string },
  ) {
    const query: Record<string, string> = {};

    if (by.id) {
      query.id = by.id;
    }
    if (by.email) {
      query.email = by.email;
    }

    return query;
  }
}
