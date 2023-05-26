import { Base } from '../../../../base/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleUser } from '../../role-user/entities/role-user.entity';
import { RolePermission } from '../../role-permission/entities/role-permission.entity';

@Entity()
export class Role extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 150, unique: true })
  name: string;

  @Column({ name: 'description', length: 255 })
  description: string;

  @OneToMany(() => RoleUser, (roleUsers) => roleUsers.role)
  roleUsers: RoleUser[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, {
    eager: true,
  })
  rolePermissions: RolePermission[];
}
