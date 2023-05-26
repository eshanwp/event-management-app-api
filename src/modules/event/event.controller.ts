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
import { EventService } from './event.service';
import { JwtAuthGuard } from '../security/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../security/auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../../base/enums/role.enum';
import { Roles } from '../../core/decorator/roles.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { Public } from '../../core/decorator/public.decorator';
import { FilterOptionsDto } from '../../base/dto/filter-options.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  /**
   * @des Handling the functionality for event creation
   * @param createEventDto
   */
  @Roles(RoleEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a event' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  /**
   * @des Handling the functionality for pagination
   * @param filterOptionsDto
   */
  @Public()
  @Post('/filter')
  @ApiOperation({ summary: 'filter event' })
  @ApiBody({ type: FilterOptionsDto })
  filter(@Body() filterOptionsDto: FilterOptionsDto) {
    return this.eventService.filter(filterOptionsDto);
  }

  /**
   * @des Handling the functionality for event update
   * @param id
   * @param updateEventDto
   */
  @Roles(RoleEnum.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Update a event' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  /**
   * @des Handling the functionality for event removal
   * @param id
   */
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a event' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventService.remove(id);
  }
}
