import { LoginRes } from '@boiler/api-interfaces';
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  public async login(@Request() req): Promise<LoginRes> {
    return await this.authService.login(req.user);
  }
}
