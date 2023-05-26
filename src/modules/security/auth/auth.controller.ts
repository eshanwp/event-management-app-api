import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '../../../core/decorator/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PasswordResetDto } from './dto/password-reset.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Handle user login' })
  login(@Request() request): any {
    return this.authService.login(request.user);
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Handle forgot password' })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.userService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post('password-reset')
  @ApiOperation({ summary: 'Handle password reset' })
  passwordReset(@Body() passwordResetDto: PasswordResetDto) {
    return this.userService.passwordReset(passwordResetDto);
  }
}
