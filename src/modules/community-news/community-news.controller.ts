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
import { CommunityNewsService } from './community-news.service';
import { CreateCommunityNewsDto } from './dto/create-community-news.dto';
import { UpdateCommunityNewsDto } from './dto/update-community-news.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterOptionsDto } from '../../base/dto/filter-options.dto';
import { JwtAuthGuard } from '../security/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../security/auth/guards/roles.guard';
import { Roles } from '../../core/decorator/roles.decorator';
import { RoleEnum } from '../../base/enums/role.enum';
import { Public } from '../../core/decorator/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Community News')
@Controller('community-news')
export class CommunityNewsController {
  constructor(private readonly communityNewsService: CommunityNewsService) {}

  /**
   * @des Handling the functionality for community news creation
   * @param createCommunityNewsDto
   */
  @Roles(RoleEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a community news' })
  create(@Body() createCommunityNewsDto: CreateCommunityNewsDto) {
    return this.communityNewsService.create(createCommunityNewsDto);
  }

  /**
   * @des Handling the functionality for pagination
   * @param filterOptionsDto
   */
  @Public()
  @Post('/filter')
  @ApiOperation({ summary: 'filter community news' })
  @ApiBody({ type: FilterOptionsDto })
  filter(@Body() filterOptionsDto: FilterOptionsDto) {
    return this.communityNewsService.filter(filterOptionsDto);
  }

  /**
   * @des Handling the functionality for community news update
   * @param id
   * @param updateCommunityNewsDto
   */
  @Roles(RoleEnum.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Update a community news' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommunityNewsDto: UpdateCommunityNewsDto,
  ) {
    return this.communityNewsService.update(id, updateCommunityNewsDto);
  }

  /**
   * @des Handling the functionality for community news removal
   * @param id
   */
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a community news' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.communityNewsService.remove(id);
  }
}
