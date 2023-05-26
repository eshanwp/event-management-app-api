import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FilterRepository } from '../../../base/repository/filter.repository';
import { Note } from '../entities/note.entity';

@Injectable()
export class NoteRepository extends FilterRepository<Note> {
  constructor(private dataSource: DataSource) {
    super(Note, dataSource.createEntityManager());
  }
}
