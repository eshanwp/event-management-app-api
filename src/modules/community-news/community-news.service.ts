import { Injectable } from '@nestjs/common';
import { CreateCommunityNewsDto } from './dto/create-community-news.dto';
import { ResponseDto } from '../../base/dto/response.dto';
import { FilterOptionsDto } from '../../base/dto/filter-options.dto';
import { PaginationResultsDto } from '../../base/dto/pagination-results.dto';
import { CommunityNewsRepository } from './repository/community-news.repository';
import { CommunityNews } from './entities/community-news.entity';
import { UpdateCommunityNewsDto } from './dto/update-community-news.dto';

@Injectable()
export class CommunityNewsService {
  constructor(
    private readonly communityNewsRepository: CommunityNewsRepository,
  ) {}

  async create(createCommunityNewsDto: CreateCommunityNewsDto) {
    const newCreateCommunityNewsDto = this.communityNewsRepository.create(
      createCommunityNewsDto,
    );
    const data = await this.communityNewsRepository.save(
      newCreateCommunityNewsDto,
    );
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      'This action adds a new community news',
      data,
    );
  }

  async filter(filterOptionsDto: FilterOptionsDto) {
    const paginationModelData: PaginationResultsDto<CommunityNews> =
      await this.communityNewsRepository.findWithPagination(filterOptionsDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      'This action returns all community news',
      paginationModelData,
    );
  }

  async update(id: string, updateCommunityNewsDto: UpdateCommunityNewsDto) {
    await this.communityNewsRepository.update(id, updateCommunityNewsDto);
    return new ResponseDto(
      true,
      'The operation has been completed successfully.',
      `This action updates a #${id} community news`,
    );
  }

  async remove(id: string) {
    const communityNews = await this.communityNewsRepository.findOne({
      where: [{ id: id }],
    });
    if (communityNews) {
      await this.communityNewsRepository.softDelete({
        id: id,
      });
      return new ResponseDto(
        true,
        'The operation has been completed successfully.',
        `This action removes a #${id} community news`,
      );
    } else {
      return new ResponseDto(
        true,
        'The operation has been completed successfully.',
        `The community news ID could not be found`,
      );
    }
  }
}
