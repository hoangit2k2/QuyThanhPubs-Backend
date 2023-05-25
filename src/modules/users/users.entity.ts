import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/common/constant/index.js';
import { Table } from '../table/table.entity';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @ManyToOne(() => Table, (table) => table.user)
  tables: Table[];

  @CreateDateColumn()
  create_at: Date;

  @DeleteDateColumn()
  delete_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
