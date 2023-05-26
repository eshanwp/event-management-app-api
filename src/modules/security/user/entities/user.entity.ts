import { Base } from '../../../../base/entities/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleUser } from '../../role-user/entities/role-user.entity';
import { EventReview } from '../../../event-review/entities/event-review.entity';
import { Note } from '../../../note/entities/note.entity';

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', length: 150, unique: true })
  email: string;

  @Column({ name: 'password', length: 1024 })
  password: string;

  @OneToMany(() => RoleUser, (roleUsers) => roleUsers.user, { eager: true })
  roleUsers: RoleUser[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.HASH_SALT),
    );
  }

  @OneToMany(() => EventReview, (eventReview) => eventReview.event)
  eventReviews: EventReview[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
