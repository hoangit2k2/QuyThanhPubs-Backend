import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(200)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(200)
  image: string;
}
