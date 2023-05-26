import { Base } from '../../../base/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../security/user/entities/user.entity';

@Entity()
export class Note extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', length: 256 })
  title: string;

  @Column({ name: 'content', length: 1024 })
  content: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.notes, {
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  user: User;
}
