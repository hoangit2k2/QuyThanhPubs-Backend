import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { AddProductDto } from './add-product.dto';

export class CreateTableProductDto {
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

  @ApiProperty()
  @Min(0)
  @Max(100)
  @IsNumber()
  number: number;

  addProductDto: AddProductDto[];
}
