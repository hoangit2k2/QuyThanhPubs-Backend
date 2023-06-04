import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  usernames: string;

  @ApiProperty()
  password: string;
}
