import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class DeleteTableProduct {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  idTableProduct: number;
}
