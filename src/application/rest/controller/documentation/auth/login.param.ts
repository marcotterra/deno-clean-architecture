import { ApiProperty } from 'danet_swagger/decorators.ts';

export class HttpRestApiLogInParam {
  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}
