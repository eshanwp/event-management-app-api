import { DataSource, Repository } from 'typeorm';
import { RoleUser } from '../entities/role-user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleUserRepository extends Repository<RoleUser> {
  constructor(private dataSource: DataSource) {
    super(RoleUser, dataSource.createEntityManager());
  }
}
