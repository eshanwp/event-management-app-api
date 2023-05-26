import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
import { FilterRepository } from '../../../../base/repository/filter.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository extends FilterRepository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }
}
