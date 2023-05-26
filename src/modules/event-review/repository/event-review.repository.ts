import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FilterRepository } from '../../../base/repository/filter.repository';
import { EventReview } from '../entities/event-review.entity';

@Injectable()
export class EventReviewRepository extends FilterRepository<EventReview> {
  constructor(private dataSource: DataSource) {
    super(EventReview, dataSource.createEntityManager());
  }
}
