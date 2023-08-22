import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ORDER_PRODUCT_STATUS } from 'src/common/constant/index';
import { Table } from '../table/table.entity';
import { Product } from '../product/product.entity';

@Entity()
export class TableProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'quantity',
  })
  quantity: number;

  @Column()
  status: ORDER_PRODUCT_STATUS;

  @ManyToOne(() => Table, (tables) => tables.tableProducts)
  table: Table;

  @ManyToOne(() => Product, (product) => product.tableProducts)
  product: Product;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
  })
  createAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamp',
  })
  deleteAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
  })
  updateAt: Date;
}
