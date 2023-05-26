import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../../../base/dto/response.dto';
import { PasswordResetRepository } from './repository/password-reset.repository';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import { PasswordResetDto } from '../auth/dto/password-reset.dto';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly passwordResetRepository: PasswordResetRepository,
  ) {}

  async createPasswordReset(
    createPasswordResetDto: CreatePasswordResetDto,
  ): Promise<ResponseDto> {
    const newPasswordReset = this.passwordResetRepository.create(
      createPasswordResetDto,
    );
    const passwordReset = await this.passwordResetRepository.save(
      newPasswordReset,
    );
    return new ResponseDto(
      true,
      'Operation Successfully.',
      'This action adds a new password-reset record',
      {
        id: passwordReset.id,
      },
    );
  }

  async findOne(passwordResetDto: PasswordResetDto) {
    return await this.passwordResetRepository.findOneBy({
      id: passwordResetDto.code,
    });
  }
}
