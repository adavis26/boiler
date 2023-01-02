import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDTO } from './user.model';
import * as bcrypt from 'bcrypt';

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

  public async getUserByUsername(username: string) {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  public async getUserById(userId: number) {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    return await bcrypt.hash(password, saltRounds);
  }
}
