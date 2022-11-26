import { Nullable, Optional } from '~/core/common/type/common-types.ts';

export class CoreAssert {
  public static isTrue(
    expression: boolean,
    exception: Error,
  ): asserts expression {
    if (!expression) {
      throw exception;
    }
  }

  public static isTruthy(
    expression: any,
    exception: Error,
  ): asserts expression {
    if (Boolean(expression) === false) {
      throw exception;
    }
  }

  public static isFalse(
    expression: boolean,
    exception: Error,
  ): asserts expression {
    if (expression) {
      throw exception;
    }
  }

  public static notEmpty<T>(value: Optional<Nullable<T>>, exception: Error): T {
    if (value === null || value === undefined) {
      throw exception;
    }
    return value;
  }

  public static notRealEmpty<T>(
    value: Optional<Nullable<T>>,
    exception: Error,
  ): asserts value {
    if (value === null || value === undefined) {
      throw exception;
    }
  }
}
