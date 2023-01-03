import { CreateUserDTO } from '@boiler/api-interfaces';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  public getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUserById(userId);
  }

  @Post()
  @Public()
  public createUser(@Body() payload: CreateUserDTO) {
    return this.userService.createUser(payload);
  }
}
