import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ROLE } from 'src/common/constant';

export class CreateUsersDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: ['admin', 'staff'] })
  @IsEnum(ROLE)
  role: ROLE;
}
