import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ResponseDto } from '../../base/dto/response.dto';
import { FilterOptionsDto } from '../../base/dto/filter-options.dto';
import { PaginationResultsDto } from '../../base/dto/pagination-results.dto';
import { EventRepository } from './repository/event.repository';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async create(createEventDto: CreateEventDto) {
    const newCreateEventDto = this.eventRepository.create(createEventDto);
    const data = await this.eventRepository.save(newCreateEventDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      'This action adds a new event',
      data,
    );
  }

  async filter(filterOptionsDto: FilterOptionsDto) {
    const paginationModelData: PaginationResultsDto<Event> =
      await this.eventRepository.findWithPagination(filterOptionsDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      'This action returns all event',
      paginationModelData,
    );
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.eventRepository.update(id, updateEventDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      `This action updates a #${id} event`,
    );
  }

  async remove(id: string) {
    const event = await this.eventRepository.findOne({
      where: [{ id: id }],
    });
    if (event) {
      await this.eventRepository.softDelete({
        id: id,
      });
      return new ResponseDto(
        true,
        'The operation has been completed successfully.',
        `This action removes a #${id} event`,
      );
    } else {
      return new ResponseDto(
        true,
        'The operation has been completed successfully.',
        `The event ID could not be found`,
      );
    }
  }
}
