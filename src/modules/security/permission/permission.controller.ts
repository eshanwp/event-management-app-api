import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterOptionsDto } from '../../../base/dto/filter-options.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../../core/decorator/roles.decorator';
import { RoleEnum } from '../../../base/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Roles(RoleEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create permission' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Post('search')
  @ApiOperation({ summary: 'Search permissions' })
  @ApiBody({ type: FilterOptionsDto })
  findAll(@Body() filterOptionsDto: FilterOptionsDto) {
    return this.permissionService.findAll(filterOptionsDto);
  }
}
