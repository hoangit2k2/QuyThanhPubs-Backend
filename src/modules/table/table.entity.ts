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
import { Users } from '../users/users.entity';
import { TableProduct } from '../table_product/table_product.entity';
import { TABLE_STATUS } from 'src/common/constant';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'note', length: 200, nullable: false })
  note: string;

  @Column({ name: 'type', default: TABLE_STATUS.SERVING })
  status: TABLE_STATUS;

  @ManyToOne(() => Users, (users) => users.username)
  user: Users;

  @OneToMany(() => TableProduct, (tableProduct) => tableProduct.table)
  tableProducts: TableProduct[];

  @CreateDateColumn({
    name: 'create_at',
    type: 'date',
  })
  createAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
    type: 'date',
  })
  deleteAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'date',
  })
  updateAt: Date;
}
