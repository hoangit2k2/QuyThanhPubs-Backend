import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLE } from 'src/common/constant/index';
import { Table } from '../table/table.entity';
@Entity()
export class Users {
  @PrimaryColumn({
    name: 'username',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  password: string;

  @Column({
    // type: 'enum',
  })
  role: ROLE;

  @OneToMany(() => Table, (table) => table.user)
  tables: Table[];

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
