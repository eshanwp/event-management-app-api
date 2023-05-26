import { PartialType } from '@nestjs/swagger';
import { CreateEventReviewDto } from './create-event-review.dto';

export class UpdateEventReviewDto extends PartialType(CreateEventReviewDto) {}
