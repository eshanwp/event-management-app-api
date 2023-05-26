import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repository/role.repository';
import { RolePermissionRepository } from '../role-permission/repository/role-permission.repository';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, RolePermissionRepository],
})
export class RoleModule {}
