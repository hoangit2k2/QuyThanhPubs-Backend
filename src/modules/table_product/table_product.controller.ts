import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TableProductService } from './table_product.service';
import { CreateTableProductDto } from './dto/create-table_product.dto';
import { UpdateTableProductDto } from './dto/update-table_product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TableProduct } from './table_product.entity';

@Controller('')
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
  create(@Body() createTableProductDto: CreateTableProductDto) {
    return this.tableProductService.create(createTableProductDto);
  }

  @Get('admin/table_product/:table_id')
  getByTableId(@Param('table_id') table_id: number) {
    return this.tableProductService.getByTableId(table_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tableProductService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTableProductDto: UpdateTableProductDto,
  // ) {
  //   return this.tableProductService.update(+id, updateTableProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tableProductService.remove(+id);
  // }
}
