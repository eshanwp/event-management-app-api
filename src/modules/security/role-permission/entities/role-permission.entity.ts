import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  permissionId: string;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    nullable: false,
    eager: true,
  })
  permission: Permission;

  @Column()
  roleId: string;

  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    nullable: false,
  })
  role: Role;
}
