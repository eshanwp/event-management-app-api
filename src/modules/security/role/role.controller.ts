import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterOptionsDto } from '../../../base/dto/filter-options.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../../core/decorator/roles.decorator';
import { RoleEnum } from '../../../base/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(RoleEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create role' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Post('filter')
  @ApiOperation({ summary: 'filter roles' })
  @ApiBody({ type: FilterOptionsDto })
  filter(@Body() filterOptionsDto: FilterOptionsDto) {
    return this.roleService.filter(filterOptionsDto);
  }
}
