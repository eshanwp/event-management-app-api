import { DataSource } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { Injectable } from '@nestjs/common';
import { FilterRepository } from '../../../../base/repository/filter.repository';

@Injectable()
export class PermissionRepository extends FilterRepository<Permission> {
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }
}
