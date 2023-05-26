import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionRepository } from './repository/permission.repository';
import { ResponseDto } from '../../../base/dto/response.dto';
import { FilterOptionsDto } from '../../../base/dto/filter-options.dto';
import { PaginationResultsDto } from '../../../base/dto/pagination-results.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const newPermission = this.permissionRepository.create(createPermissionDto);
    const data = await this.permissionRepository.save(newPermission);
    return new ResponseDto(
      true,
      'Operation Successfully.',
      'This action adds a new permission',
      {
        name: data.name,
        description: data.description,
        createdOn: data.createdOn,
      },
    );
  }

  async findAll(filterOptionsDto: FilterOptionsDto) {
    const paginationModelData: PaginationResultsDto<Permission> =
      await this.permissionRepository.findWithPagination(filterOptionsDto);
    return new ResponseDto(
      true,
      'Operation Successfully.',
      'This action returns all permissions',
      paginationModelData,
    );
  }
}
