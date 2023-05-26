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
import { NoteService } from './note.service';
import { JwtAuthGuard } from '../security/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterOptionsDto } from '../../base/dto/filter-options.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  /**
   * @des Handling the functionality for note creation
   * @param createNoteDto
   */
  @Post()
  @ApiOperation({ summary: 'Create a note' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  /**
   * @des Handling the functionality for pagination
   * @param filterOptionsDto
   */
  @Post('/filter')
  @ApiOperation({ summary: 'filter note' })
  @ApiBody({ type: FilterOptionsDto })
  filter(@Body() filterOptionsDto: FilterOptionsDto) {
    return this.noteService.filter(filterOptionsDto);
  }

  /**
   * @des Handling the functionality for note update
   * @param id
   * @param updateNoteDto
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a note' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.noteService.update(id, updateNoteDto);
  }

  /**
   * @des Handling the functionality for note removal
   * @param id
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a note' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.noteService.remove(id);
  }
}
