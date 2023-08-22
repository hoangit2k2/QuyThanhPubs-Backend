import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ORDER_PRODUCT_STATUS } from 'src/common/constant';

export class UpdateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({ enum: ['not_yet_delivered', 'delivered'] })
  @IsNotEmpty()
  @IsEnum(ORDER_PRODUCT_STATUS)
  status: ORDER_PRODUCT_STATUS;
}

export class UpdateTableProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameTable: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ type: [UpdateProductDto] })
  updateProductDto: UpdateProductDto[];
}
