import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from './entities/password-reset.entity';
import { PasswordResetRepository } from './repository/password-reset.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordReset])],
  controllers: [],
  providers: [PasswordResetService, PasswordResetRepository],
})
export class PasswordResetModule {}
