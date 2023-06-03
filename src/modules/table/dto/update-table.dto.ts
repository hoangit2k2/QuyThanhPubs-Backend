import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { TABLE_STATUS } from 'src/common/constant';

export class UpdateTableDto {
  @ApiProperty()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(200)
  note: string;

  @ApiProperty({ enum: ['serving', 'paid', 'unpaid'] })
  @IsEnum({ TABLE_STATUS })
  status: TABLE_STATUS;
}
