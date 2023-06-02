import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

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
  // @IsNumber()
  price: number;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(20)
  unit: string;

  @ApiProperty()
  @IsNotEmpty()
  // @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  // @IsNumber()
  categoryId: number;
}
