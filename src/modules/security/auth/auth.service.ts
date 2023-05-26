import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    const match = await bcrypt.compare(pass, user.password);

    if (match) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const roles = [];
    const permissions = [];
    user.roleUsers.map((role) => {
      role.role.rolePermissions.map((permission) => {
        permissions.push(permission.permission.name);
      });
      roles.push(role.role.name);
    });

    const payload = {
      userId: user.id,
      userName: user.email,
      roles: roles,
      permissions: permissions,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      roles: roles,
      permissions: permissions,
      userId: user.id,
      userName: user.email,
    };
  }
}
