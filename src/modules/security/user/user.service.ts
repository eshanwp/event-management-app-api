import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { ResponseDto } from '../../../base/dto/response.dto';
import { User } from './entities/user.entity';
import { RoleUserRepository } from '../role-user/repository/role-user.repository';
import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto';
import { MailService } from '../../mail/mail.service';
import { MailOptions } from '../../mail/dto/mail-options';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { CreatePasswordResetDto } from '../password-reset/dto/create-password-reset.dto';
import { PasswordResetDto } from '../auth/dto/password-reset.dto';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '../../../base/enums/role.enum';
import { RoleRepository } from '../role/repository/role.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleUserRepository: RoleUserRepository,
    private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService,
    private readonly roleRepository: RoleRepository,
  ) {}

  async registration(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (user) {
      throw new ConflictException(`User is already in the system`);
    }

    const role = await this.roleRepository.findOneBy({
      name: RoleEnum.CUSTOMER,
    });
    if (createUserDto.roles === undefined) {
      createUserDto.roles = [role.id];
    }
    const newUser = this.userRepository.create(createUserDto);
    const data = await this.userRepository.save(newUser);
    createUserDto.roles.map((role) => {
      this.roleUserRepository.save({
        userId: data.id,
        roleId: role,
      });
    });
    return new ResponseDto(
      true,
      'Operation Successfully.',
      'Your account has been created. You can now log in.',
      null,
    );
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findOneBy({
      email: forgotPasswordDto.email,
    });

    if (!user) {
      throw new NotFoundException(
        `We couldn't find a user with that email address.`,
      );
    }

    const token = Date.now().toString(36);

    const createPasswordResetDto: CreatePasswordResetDto = {
      email: forgotPasswordDto.email,
      token: token,
    };

    const passwordResetRecord =
      await this.passwordResetService.createPasswordReset(
        createPasswordResetDto,
      );

    const resetLink = `${process.env.PASSWORD_RESET_LINK}?email=${forgotPasswordDto.email}&token=${token}&code=${passwordResetRecord.data.id}`;

    const mailOptions: MailOptions = {
      to: forgotPasswordDto.email,
      subject: 'Password Reset',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
                  <head>
                    <title>Password Reset</title>
                    <meta name="viewport" content="width = 375, initial-scale = -1">
                  </head>
                
                  <body style="background-color: #ffffff; font-size: 16px;">
                    <center>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" style="height:100%; width:600px;">
                          <!-- BEGIN EMAIL -->
                          <tr>
                            <td align="center" bgcolor="#ffffff" style="padding:30px">
                               <p style="text-align:left">Hello, ${forgotPasswordDto.email}
                               <br><br> We received a request to reset the password for your account for this email address. To initiate the password reset process for your account, click the link below.
                              </p>
                              <p>
                                <a target="_blank" style="text-decoration:none; background-color: black; border: black 1px solid; color: #fff; padding:10px 10px; display:block;" href="${resetLink}">
                                  <strong>Reset Password</strong></a>
                              </p>
                              <p style="text-align:left">This link can only be used once. If you need to reset your password again, please visit <a href="${process.env.PASSWORD_RESET_LINK}">regov.com</a> and request another reset.<br><br>If you did not make this request, you can simply ignore this email.</p>
                              <p style="text-align:left">
                              Sincerely,<br>The Regov Team
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </center>
                  </body>
                </html>`,
    };
    this.mailService.sendMail(mailOptions);

    return new ResponseDto(
      true,
      'Operation Successfully.',
      'We have sent you an email with a link to reset your password.',
      null,
    );
  }

  async passwordReset(passwordResetDto: PasswordResetDto) {
    const passwordResetRecord = await this.passwordResetService.findOne(
      passwordResetDto,
    );

    if (!passwordResetRecord) {
      throw new NotFoundException(`Please try again with a different code.`);
    }

    const match = await bcrypt.compare(
      passwordResetDto.token,
      passwordResetRecord.token,
    );

    if (match) {
      const user = await this.userRepository.findOneBy({
        email: passwordResetDto.email,
      });

      if (!user) {
        throw new NotFoundException(
          `We couldn't find a user with that email address.`,
        );
      }

      await this.userRepository.update(user.id, {
        password: await bcrypt.hash(
          passwordResetDto.password,
          Number(process.env.HASH_SALT),
        ),
      });

      return new ResponseDto(
        true,
        'Operation Successfully.',
        `Your password has been reset. Please log in with your new password.`,
        null,
      );
    } else {
      return new ResponseDto(
        true,
        'Operation Successfully.',
        `Please try again with a different token.`,
        null,
      );
    }
  }
}
