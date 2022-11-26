import { Code } from '~/core/common/code/code.ts';
import { Exception } from '~/core/common/exception/exception.ts';
import { Optional } from '~/core/common/type/common-types.ts';
import {
  ClassValidationDetails,
  ClassValidator,
} from '~/core/common/util/class-validator.ts';

export class UseCaseValidatableAdapter {
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator
      .validate(this);

    if (details) {
      throw Exception.build({
        code: Code.USE_CASE_PORT_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
