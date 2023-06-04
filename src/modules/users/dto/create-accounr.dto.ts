import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MESSAGES, REGEX, ROLE } from 'src/common/constant';

export class CreateUsersDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({ enum: ['admin', 'staff'] })
  @IsEnum(ROLE)
  role: ROLE;
}
