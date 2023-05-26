import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from '../../../base/entities/base.entity';
import { Event } from '../../event/entities/event.entity';
import { User } from '../../security/user/entities/user.entity';

@Entity()
export class EventReview extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'review', length: 1024 })
  review: string;

  @Column({ name: 'rate', type: 'int', default: 0 })
  rate: number;

  @Column()
  eventId: string;

  @ManyToOne(() => Event, (event) => event.eventReviews, { nullable: false })
  @JoinColumn()
  event: Event;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.eventReviews, { nullable: false })
  @JoinColumn()
  user: User;
}
