import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { TableProduct } from '../table_product/table_product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  price: number;

  @Column({ nullable: true })
  @ApiProperty()
  unit: string;

  @Column({ nullable: true })
  @ApiProperty()
  quantity: number;

  @Column()
  @ApiProperty()
  image: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => TableProduct, (tableProduct) => tableProduct.product)
  tableProducts: TableProduct[];

  @CreateDateColumn()
  @ApiProperty()
  create_at: number;

  @DeleteDateColumn()
  @ApiProperty()
  delete_at: number;

  @UpdateDateColumn()
  @ApiProperty()
  update_at: number;
}
