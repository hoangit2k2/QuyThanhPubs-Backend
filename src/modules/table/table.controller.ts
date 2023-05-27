import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TABLE_STATUS } from 'src/common/constant';

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

  @Patch('admin/table/:tableId/:status')
  update(
    @Param('tableId') tableId: number,
    @Param('status') status: TABLE_STATUS,
  ) {
    return this.tableService.updateStatusTable(tableId, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
