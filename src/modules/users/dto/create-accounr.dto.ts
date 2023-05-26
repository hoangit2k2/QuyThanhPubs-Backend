import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ROLE } from 'src/common/constant';

export class CreateUsersDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty()
  password: string;

  @IsEnum(ROLE)
  role: ROLE;
}
