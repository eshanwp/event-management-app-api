import { Base } from '../../../../base/entities/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class RoleUser extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.roleUsers, { nullable: false })
  user: User;

  @Column()
  roleId: string;

  @ManyToOne(() => Role, (role) => role.roleUsers, {
    nullable: false,
    eager: true,
  })
  role: Role;
}
