import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleRepository } from './repository/role.repository';
import { ResponseDto } from '../../../base/dto/response.dto';
import { Role } from './entities/role.entity';
import { RolePermissionRepository } from '../role-permission/repository/role-permission.repository';
import { FilterOptionsDto } from '../../../base/dto/filter-options.dto';
import { PaginationResultsDto } from '../../../base/dto/pagination-results.dto';
import { RoleEnum } from '../../../base/enums/role.enum';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly rolePermissionRepository: RolePermissionRepository,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const newRole = this.roleRepository.create(createRoleDto);
    const data = await this.roleRepository.save(newRole);
    createRoleDto.permissions.map((permission) => {
      this.rolePermissionRepository.save({
        roleId: data.id,
        permissionId: permission,
      });
    });
    return new ResponseDto(
      true,
      'Operation Successfully.',
      'This action adds a new role',
      {
        name: data.name,
        description: data.description,
        createdOn: data.createdOn,
      },
    );
  }

  async filter(filterOptionsDto: FilterOptionsDto) {
    const paginationModelData: PaginationResultsDto<Role> =
      await this.roleRepository.findWithPagination(filterOptionsDto);
    return new ResponseDto(
      true,
      'Operation Successfully.',
      'This action returns all roles',
      paginationModelData,
    );
  }

  async findOne(roleName: RoleEnum) {
    return await this.roleRepository.findOneBy({
      name: roleName,
    });
  }
}
