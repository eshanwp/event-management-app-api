import { Injectable } from '@nestjs/common';
import { CreateEventReviewDto } from './dto/create-event-review.dto';
import { UpdateEventReviewDto } from './dto/update-event-review.dto';
import { ResponseDto } from '../../base/dto/response.dto';
import { FilterOptionsDto } from '../../base/dto/filter-options.dto';
import { PaginationResultsDto } from '../../base/dto/pagination-results.dto';
import { EventReviewRepository } from './repository/event-review.repository';
import { EventReview } from './entities/event-review.entity';

@Injectable()
export class EventReviewService {
  constructor(private readonly eventReviewRepository: EventReviewRepository) {}

  async create(createEventReviewDto: CreateEventReviewDto) {
    const newCreateEventReviewDto =
      this.eventReviewRepository.create(createEventReviewDto);
    await this.eventReviewRepository.save(newCreateEventReviewDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      'Thank you for your review. It has been added successfully.',
      null,
    );
  }

  async filter(filterOptionsDto: FilterOptionsDto) {
    const paginationModelData: PaginationResultsDto<EventReview> =
      await this.eventReviewRepository.findWithPagination(filterOptionsDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      'This action returns all event review',
      paginationModelData,
    );
  }

  async update(id: string, updateEventReviewDto: UpdateEventReviewDto) {
    await this.eventReviewRepository.update(id, updateEventReviewDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      `This action updates a #${id} event review`,
    );
  }

  async remove(id: string) {
    const eventReview = await this.eventReviewRepository.findOne({
      where: [{ id: id }],
    });
    if (eventReview) {
      await this.eventReviewRepository.softDelete({
        id: id,
      });
      return new ResponseDto(
        true,
        'The operation has been completed successfully.',
        `This action removes a #${id} event review`,
      );
    } else {
      return new ResponseDto(
        true,
        'The operation has been completed successfully.',
        `The event review could not be found`,
      );
    }
  }
}
