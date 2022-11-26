import { DataTypes, Model } from 'denodb/mod.ts';
import type { ModelFields } from 'denodb/lib/model.ts';

export class UserModel extends Model {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;

  static table = 'users';

  static timestamps = true;

  static fields: ModelFields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      length: 25,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  };
}
