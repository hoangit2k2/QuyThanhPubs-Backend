import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';
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
