import {
  Controller,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { TableProductService } from './table_product.service';
import { CreateTableProductDto } from './dto/create-table_product.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TableProduct } from './table_product.entity';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateTableProductDto } from './dto/update-table_product.dto';
import { AddNewProductDto } from './dto/add-product.dto';

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

  // @Get('admin/table_product/:table_id')
  // getByTableId(@Param('table_id') table_id: number) {
  //   return this.tableProductService.getByTableId(table_id);
  // }

  @ApiOperation({ summary: 'Update table product' })
  @ApiResponse({
    description: 'product not found.',
    status: 404,
  })
  @ApiResponse({
    description: 'create a new table product successfully.',
    type: TableProduct,
    status: 200,
  })
  @Put('admin/tableProduct/:tableProductId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('tableProductId') tableProductId: number,
    @Body() updateTableProductDto: UpdateTableProductDto,
  ) {
    return await this.tableProductService.update(
      tableProductId,
      updateTableProductDto,
    );
  }

  @ApiOperation({ summary: 'add product for table' })
  @ApiResponse({
    description: 'product not found.',
    status: 404,
  })
  @ApiResponse({
    description: 'create a new table product successfully.',
    type: TableProduct,
    status: 200,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('admin/tableProduct/addProduct/:tableId')
  addProductForTable(
    @Param('tableId') tableId: number,
    @Body() addNewProductDto: AddNewProductDto,
  ) {
    return this.tableProductService.addProductForTable(
      tableId,
      addNewProductDto,
    );
  }

  @ApiOperation({ summary: 'add product for table' })
  @ApiResponse({
    description: 'product not found.',
    status: 404,
  })
  @ApiResponse({
    description: 'create a new table product successfully.',
    type: TableProduct,
    status: 200,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete('admin/tableProduct/:tableProductId')
  deleteTabeleProduct(@Param('tableProductId') tableProductId: number) {
    return this.tableProductService.deleteTableProduct(tableProductId);
  }
}
