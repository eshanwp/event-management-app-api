import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PasswordReset } from '../entities/password-reset.entity';

@Injectable()
export class PasswordResetRepository extends Repository<PasswordReset> {
  constructor(private dataSource: DataSource) {
    super(PasswordReset, dataSource.createEntityManager());
  }
}
