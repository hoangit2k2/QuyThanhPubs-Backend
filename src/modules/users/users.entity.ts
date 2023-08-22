import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLE } from 'src/common/constant/index';
import { Table } from '../table/table.entity';
import * as bcrypt from 'bcrypt';
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

  @Column({})
  role: ROLE;

  @OneToMany(() => Table, (table) => table.user)
  tables: Table[];

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
  })
  createAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamptz',
  })
  deleteAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
  })
  updateAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
