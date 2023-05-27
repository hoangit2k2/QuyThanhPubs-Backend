import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTableDto {
  @ApiProperty()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(200)
  note: string;

  @ApiProperty()
  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  user: string;
}
