import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { Users } from '../users/users.entity';
import { TableProduct } from '../table_product/table_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table, Users, TableProduct])],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
