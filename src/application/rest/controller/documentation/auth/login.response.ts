import { ApiProperty } from 'danet_swagger/decorators.ts';

export class HttpRestApiLoggedInUserResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  accessToken!: string;
}
