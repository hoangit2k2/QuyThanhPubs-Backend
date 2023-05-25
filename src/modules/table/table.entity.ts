import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  note: string;

  @ManyToOne(() => Users, (users) => users.id)
  user: Users;

  @CreateDateColumn()
  create_at: Date;

  @DeleteDateColumn()
  delete_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
