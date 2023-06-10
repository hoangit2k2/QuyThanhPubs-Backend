import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TableProductService } from './table_product.service';
import {
  AddProductsForTableDto,
  CreateTableProductDto,
} from './dto/create-table_product.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TableProduct } from './table_product.entity';
import { AuthGuard } from '../auth/auth.guard';

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
  @Post('admin/table_product')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTableProductDto: CreateTableProductDto) {
    return this.tableProductService.create(createTableProductDto);
  }

  @Get('admin/table_product/:table_id')
  getByTableId(@Param('table_id') table_id: number) {
    return this.tableProductService.getByTableId(table_id);
  }

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
  @Put('admin/table_product/:tableProductId')
  update(
    @Param('tableProductId') tableProductId: number,
    @Body() addProductsForTableDto: AddProductsForTableDto,
  ) {
    return this.tableProductService.update(
      tableProductId,
      addProductsForTableDto,
    );
  }
}
