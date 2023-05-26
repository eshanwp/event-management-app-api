import { Base } from '../../../../base/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolePermission } from '../../role-permission/entities/role-permission.entity';

@Entity()
export class Permission extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 150, unique: true })
  name: string;

  @Column({ name: 'description', length: 255 })
  description: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions: RolePermission[];
}
