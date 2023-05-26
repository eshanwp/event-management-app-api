import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FilterRepository } from '../../../base/repository/filter.repository';
import { CommunityNews } from '../entities/community-news.entity';

@Injectable()
export class CommunityNewsRepository extends FilterRepository<CommunityNews> {
  constructor(private dataSource: DataSource) {
    super(CommunityNews, dataSource.createEntityManager());
  }
}
