import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginRes, User } from '@boiler/api-interfaces';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getAuthUserInfo(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.userService.stripPasswordFromUser(user);
    }
    return null;
  }

  async login(user: User): Promise<LoginRes> {
    return {
      access_token: await this.jwtService.signAsync(user, { expiresIn: 3600 }),
    };
  }
}
