import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ORDER_PRODUCT_STATUS } from 'src/common/constant/index';
import { Table } from '../table/table.entity';
import { Product } from '../product/product.entity';

@Entity()
export class TableProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'number',
  })
  number: number;

  @Column()
  status: ORDER_PRODUCT_STATUS;

  @ManyToOne(() => Table, (tables) => tables.tableProducts)
  table: Table;

  @ManyToOne(() => Product, (product) => product.tableProducts)
  product: Product;
}
