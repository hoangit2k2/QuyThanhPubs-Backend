import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableProductService } from './table_product.service';
import { CreateTableProductDto } from './dto/create-table_product.dto';
import { UpdateTableProductDto } from './dto/update-table_product.dto';

@Controller('table-product')
export class TableProductController {
  constructor(private readonly tableProductService: TableProductService) {}

  @Post()
  create(@Body() createTableProductDto: CreateTableProductDto) {
    return this.tableProductService.create(createTableProductDto);
  }

  @Get()
  findAll() {
    return this.tableProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableProductDto: UpdateTableProductDto) {
    return this.tableProductService.update(+id, updateTableProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableProductService.remove(+id);
  }
}
