import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TABLE_STATUS } from 'src/common/constant';
import { Table } from './table.entity';

@Controller('')
@ApiTags('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('admin/table')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({
    type: CreateTableDto,
  })
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Delete('admin/table/:tableId')
  deleteTableById(@Param('tableId') tableId: number) {
    return this.tableService.deleteTableById(tableId);
  }

  @Put('admin/table/:tableId/:status')
  @ApiParam({ name: 'status', enum: TABLE_STATUS })
  update(
    @Param('tableId') tableId: number,
    @Param('status') status: TABLE_STATUS,
  ) {
    return this.tableService.updateStatusTable(tableId, status);
  }

  @Get('admin/table/:tableId')
  getTableById(@Param('tableId') tableId: number): Promise<Table> {
    return this.tableService.findOne(tableId);
  }

  @Get('admin/table')
  @ApiQuery({ name: 'status', enum: TABLE_STATUS })
  getTableByStatus(@Query('status') status: TABLE_STATUS): Promise<Table[]> {
    return this.tableService.findByStatus(status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
