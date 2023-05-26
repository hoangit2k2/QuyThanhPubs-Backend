import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { TableProduct } from '../table_product/table_product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => TableProduct, (tableProduct) => tableProduct.product)
  tableProducts: TableProduct[];

  @CreateDateColumn()
  create_at: number;

  @DeleteDateColumn()
  delete_at: number;
}
