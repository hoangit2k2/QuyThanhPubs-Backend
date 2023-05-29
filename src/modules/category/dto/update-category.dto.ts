import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(100)
  description: string;
}
