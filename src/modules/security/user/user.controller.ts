import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../../../core/decorator/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('registration')
  @ApiOperation({ summary: 'User Registration' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.registration(createUserDto);
  }
}
