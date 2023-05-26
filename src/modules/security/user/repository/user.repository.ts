import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { FilterRepository } from '../../../../base/repository/filter.repository';

@Injectable()
export class UserRepository extends FilterRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
