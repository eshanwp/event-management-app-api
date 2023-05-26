import { Base } from '../../../../base/entities/base.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class PasswordReset extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', length: 150 })
  email: string;

  @Column({ name: 'token', length: 1024 })
  token: string;

  @BeforeInsert()
  async hashPassword() {
    this.token = await bcrypt.hash(this.token, Number(process.env.HASH_SALT));
  }
}
