import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TABLE_STATUS } from 'src/common/constant';
import { Table } from './table.entity';
import { UpdateTableDto } from './dto/update-table.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
  @UsePipes(new ValidationPipe({ transform: true }))
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

  @Put('admin/table/:tableId')
  @ApiOperation({ summary: 'Update Status Table' })
  @ApiCreatedResponse({
    description: ' Update table successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Table not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  // @ApiParam({ name: 'status', enum: TABLE_STATUS })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('tableId') tableId: number,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    return this.tableService.updateStatusTable(tableId, updateTableDto);
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
  getTableById(@Param('tableId') tableId: number) {
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
  getTableByStatus(
    @Query('status') status: TABLE_STATUS,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ): Promise<Table[]> {
    return this.tableService.findTable(status, startDate, endDate);
  }

  @Get('admin/table/name/findBy')
  @ApiOperation({ summary: 'Get Table By Name' })
  @ApiCreatedResponse({
    description: ' Get table successfully.',
    type: [Table],
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  getByName(@Query('name') name: string): Promise<Table[]> {
    return this.tableService.findByName(name);
  }
}
