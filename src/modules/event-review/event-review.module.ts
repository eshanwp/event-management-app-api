import { Module } from '@nestjs/common';
import { EventReviewService } from './event-review.service';
import { EventReviewController } from './event-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventReview } from './entities/event-review.entity';
import { EventReviewRepository } from './repository/event-review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EventReview])],
  controllers: [EventReviewController],
  providers: [EventReviewService, EventReviewRepository],
})
export class EventReviewModule {}
