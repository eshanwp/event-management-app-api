import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FilterRepository } from '../../../base/repository/filter.repository';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventRepository extends FilterRepository<Event> {
  constructor(private dataSource: DataSource) {
    super(Event, dataSource.createEntityManager());
  }
}
