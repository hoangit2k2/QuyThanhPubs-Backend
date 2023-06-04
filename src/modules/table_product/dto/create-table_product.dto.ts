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
import { ORDER_PRODUCT_STATUS } from 'src/common/constant';

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
  @IsNotEmpty()
  addProductDto: AddProductDto[];
}
export class AddProductsForTableDto {
  @ApiProperty({ enum: ['not_yet_delivered', 'delivered'] })
  @IsNotEmpty()
  @IsEnum(ORDER_PRODUCT_STATUS)
  status: ORDER_PRODUCT_STATUS;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  table_id: number;
}
