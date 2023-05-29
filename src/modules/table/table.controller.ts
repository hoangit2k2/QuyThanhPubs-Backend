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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TABLE_STATUS } from 'src/common/constant';
import { Table } from './table.entity';

@Controller('')
@ApiTags('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('admin/table')
  @ApiOperation({ summary: 'Create new Table' })
  @ApiCreatedResponse({
    description: 'Create new Table successfully.',
    type: CreateTableDto,
  })
  @ApiBadRequestResponse({
    description: 'user already exists',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({
    type: CreateTableDto,
  })
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Delete('admin/table/:tableId')
  @ApiOperation({ summary: 'Delete Table' })
  @ApiCreatedResponse({
    description: ' Delete table successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Table not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  deleteTableById(@Param('tableId') tableId: number) {
    return this.tableService.deleteTableById(tableId);
  }

  @Put('admin/table/:tableId/:status')
  @ApiOperation({ summary: 'Update Status Table' })
  @ApiCreatedResponse({
    description: ' Update table successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Table not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiParam({ name: 'status', enum: TABLE_STATUS })
  update(
    @Param('tableId') tableId: number,
    @Param('status') status: TABLE_STATUS,
  ) {
    return this.tableService.updateStatusTable(tableId, status);
  }

  @Get('admin/table/:tableId')
  @ApiOperation({ summary: 'Get Table By Id' })
  @ApiCreatedResponse({
    description: ' Get table successfully.',
    type: Table,
  })
  @ApiBadRequestResponse({
    description: 'Table not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  getTableById(@Param('tableId') tableId: number): Promise<Table> {
    return this.tableService.findOne(tableId);
  }

  @Get('admin/table')
  @ApiOperation({ summary: 'Get All Table' })
  @ApiCreatedResponse({
    description: ' Get table successfully.',
    type: [Table],
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiQuery({ name: 'status', enum: TABLE_STATUS })
  getTableByStatus(@Query('status') status: TABLE_STATUS): Promise<Table[]> {
    return this.tableService.findByStatus(status);
  }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete Table By Id' })
  // @ApiCreatedResponse({
  //   description: ' Delete table successfully.',
  // })
  // @ApiForbiddenResponse({ description: 'Forbidden.' })
  // remove(@Param('id') id: string) {
  //   return this.tableService.remove(+id);
  // }
}
