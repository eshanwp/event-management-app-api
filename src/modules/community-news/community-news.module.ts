import { Module } from '@nestjs/common';
import { CommunityNewsService } from './community-news.service';
import { CommunityNewsController } from './community-news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityNews } from './entities/community-news.entity';
import { CommunityNewsRepository } from './repository/community-news.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityNews])],
  controllers: [CommunityNewsController],
  providers: [CommunityNewsService, CommunityNewsRepository],
})
export class CommunityNewsModule {}
