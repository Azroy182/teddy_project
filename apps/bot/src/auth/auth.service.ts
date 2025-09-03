import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDtoType } from '@teddy/shared';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDtoType) {
    const staff = await this.prisma.staff.findUnique({
      where: { email: dto.email },
    });

    if (!staff) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Simple hash comparison for development - replace with argon2 in production
    const hashedPassword = crypto.createHash('sha256').update(dto.password).digest('hex');
    const isPasswordValid = staff.passwordHash === hashedPassword;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: staff.id,
      email: staff.email,
      role: staff.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: staff.id,
        email: staff.email,
        name: staff.name,
        role: staff.role,
      },
    };
  }

  async validateUser(userId: string) {
    return this.prisma.staff.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }
}
