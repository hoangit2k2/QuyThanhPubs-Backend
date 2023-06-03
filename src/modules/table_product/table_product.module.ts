import { Table } from './../table/table.entity';
import { Product } from './../product/product.entity';
import { TableProduct } from './table_product.entity';
import { Module } from '@nestjs/common';
import { TableProductService } from './table_product.service';
import { TableProductController } from './table_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableProduct, Product, Table, Users])],
  controllers: [TableProductController],
  providers: [TableProductService],
})
export class TableProductModule {}
