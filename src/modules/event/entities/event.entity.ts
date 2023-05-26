import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../../base/entities/base.entity';
import { EventReview } from '../../event-review/entities/event-review.entity';

@Entity()
export class Event extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', length: 256 })
  eventName: string;

  @Column({ name: 'event_description', length: 1024 })
  eventDescription: string;

  @Column({ name: 'start_time' })
  startTime: Date;

  @Column({ name: 'end_time' })
  endTime: Date;

  @OneToMany(() => EventReview, (eventReview) => eventReview.event)
  eventReviews: EventReview[];
}
