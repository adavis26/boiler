import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, User } from '@boiler/api-interfaces';
import { user, user as userEntity } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async createUser(payload: CreateUserDTO) {
    return await this.prisma.user.create({
      data: {
        username: payload.username,
        password: await this.hashPassword(payload.password),
      },
    });
  }

  public async getAuthUserInfo(username: string): Promise<user> {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  public async getUserById(userId: number) {
    const user: userEntity = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return this.stripPasswordFromUser(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    return await bcrypt.hash(password, saltRounds);
  }

  public stripPasswordFromUser(user: userEntity): User {
    delete user.password;
    return user;
  }
}
