import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TableProductService } from './table_product.service';
import { CreateTableProductDto } from './dto/create-table_product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TableProduct } from './table_product.entity';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateTableProductDto } from './dto/update-product.dto';

@Controller('')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Table-Product')
export class TableProductController {
  constructor(private readonly tableProductService: TableProductService) {}
  @ApiOperation({ summary: 'Create a new table product' })
  @ApiResponse({
    description: 'product not found.',
    status: 404,
  })
  @ApiResponse({
    description: 'create a new table product successfully.',
    type: TableProduct,
    status: 200,
  })
  @Post('admin/tableProduct')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTableProductDto: CreateTableProductDto) {
    return this.tableProductService.create(createTableProductDto);
  }

  @ApiOperation({ summary: 'update table' })
  @ApiResponse({
    description: 'product not found.',
    status: 404,
  })
  @ApiResponse({
    description: 'update table successfully.',
    type: [UpdateTableProductDto],
    status: 200,
  })
  @ApiBody({
    type: UpdateTableProductDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put('admin/updateTable/:tableId')
  deleteTableProduct(
    @Param('tableId') tableId: number,

    @Body() updateTableProductDto: UpdateTableProductDto,
  ) {
    this.tableProductService.updateProductInTable(
      tableId,
      updateTableProductDto,
    );
    return new HttpException('Cập nhật bàn thành công', HttpStatus.OK);
  }
}
