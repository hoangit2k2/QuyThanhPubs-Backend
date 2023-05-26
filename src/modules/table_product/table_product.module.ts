import { Module } from '@nestjs/common';
import { TableProductService } from './table_product.service';
import { TableProductController } from './table_product.controller';

@Module({
  controllers: [TableProductController],
  providers: [TableProductService]
})
export class TableProductModule {}
