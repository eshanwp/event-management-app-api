import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventReviewService } from './event-review.service';
import { Roles } from '../../core/decorator/roles.decorator';
import { RoleEnum } from '../../base/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../core/decorator/public.decorator';
import { FilterOptionsDto } from '../../base/dto/filter-options.dto';
import { JwtAuthGuard } from '../security/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../security/auth/guards/roles.guard';
import { CreateEventReviewDto } from './dto/create-event-review.dto';
import { UpdateEventReviewDto } from './dto/update-event-review.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Event Review')
@Controller('event-review')
export class EventReviewController {
  constructor(private readonly eventReviewService: EventReviewService) {}

  /**
   * @des Handling the functionality for event review creation
   * @param createEventReviewDto
   */
  @Post()
  @ApiOperation({ summary: 'Create a event review' })
  create(@Body() createEventReviewDto: CreateEventReviewDto) {
    return this.eventReviewService.create(createEventReviewDto);
  }

  /**
   * @des Handling the functionality for pagination
   * @param filterOptionsDto
   */
  @Public()
  @Post('/filter')
  @ApiOperation({ summary: 'filter event review' })
  @ApiBody({ type: FilterOptionsDto })
  filter(@Body() filterOptionsDto: FilterOptionsDto) {
    return this.eventReviewService.filter(filterOptionsDto);
  }

  /**
   * @des Handling the functionality for event review update
   * @param id
   * @param updateEventReviewDto
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a event review' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventReviewDto: UpdateEventReviewDto,
  ) {
    return this.eventReviewService.update(id, updateEventReviewDto);
  }

  /**
   * @des Handling the functionality for event review removal
   * @param id
   */
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a event review' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventReviewService.remove(id);
  }
}
