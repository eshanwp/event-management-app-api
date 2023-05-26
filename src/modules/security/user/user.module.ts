import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { RoleUserRepository } from '../role-user/repository/role-user.repository';
import { User } from './entities/user.entity';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { PasswordResetModule } from '../password-reset/password-reset.module';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { PasswordResetRepository } from '../password-reset/repository/password-reset.repository';
import { RoleRepository } from '../role/repository/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule, PasswordResetModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    RoleUserRepository,
    MailService,
    PasswordResetService,
    PasswordResetRepository,
    RoleRepository,
  ],
  exports: [
    UserService,
    MailService,
    PasswordResetService,
    PasswordResetRepository,
  ],
})
export class UserModule {}
