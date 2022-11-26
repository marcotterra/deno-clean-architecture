import type { Optional } from '~/core/common/type/common-types.ts';
import { Exception } from '~/core/common/exception/exception.ts';
import { Code } from '~/core/common/code/code.ts';
import {
  ClassValidationDetails,
  ClassValidator,
} from '~/core/common/util/class-validator.ts';

export class Entity<TIdentifier extends string | number> {
  protected id: Optional<TIdentifier>;

  public getId(): TIdentifier {
    if (typeof this.id === 'undefined') {
      throw Exception.build({
        code: Code.ENTITY_VALIDATION_ERROR,
        overrideMessage: `${this.constructor.name}: ID is empty.`,
      });
    }

    return this.id;
  }

  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator
      .validate(this);

    if (details) {
      throw Exception.build({
        code: Code.ENTITY_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
