import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ResponseDto } from '../../base/dto/response.dto';
import { FilterOptionsDto } from '../../base/dto/filter-options.dto';
import { PaginationResultsDto } from '../../base/dto/pagination-results.dto';
import { NoteRepository } from './repository/note.repository';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async create(createNoteDto: CreateNoteDto) {
    const newCreateNoteDto = this.noteRepository.create(createNoteDto);
    const data = await this.noteRepository.save(newCreateNoteDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      'The note has been added successfully.',
      data,
    );
  }

  async filter(filterOptionsDto: FilterOptionsDto) {
    const paginationModelData: PaginationResultsDto<Note> =
      await this.noteRepository.findWithPagination(filterOptionsDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      'This action returns all note',
      paginationModelData,
    );
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.noteRepository.update(id, updateNoteDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      `The #${updateNoteDto.title} note has been updated successfully.`,
    );
  }

  async remove(id: string) {
    const note = await this.noteRepository.findOne({
      where: [{ id: id }],
    });
    if (note) {
      await this.noteRepository.softDelete({
        id: id,
      });
      return new ResponseDto(
        true,
        'The operation has been completed successfully.',
        `The note has been removed successfully.`,
      );
    } else {
      return new ResponseDto(
        true,
        'The operation has been completed successfully.',
        `The note could not be found`,
      );
    }
  }
}
