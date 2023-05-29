import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn()
  @ApiProperty()
  create_at: Date;

  @DeleteDateColumn()
  @ApiProperty()
  delete_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  update_at: Date;
}
