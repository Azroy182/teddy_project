import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VouchersService {
  constructor(private prisma: PrismaService) {}

  async findVoucher(code: string) {
    return this.prisma.voucher.findUnique({
      where: { code },
      include: {
        family: true,
      },
    });
  }

  async redeemVoucher(code: string, staffId: string) {
    const voucher = await this.findVoucher(code);

    if (!voucher) {
      throw new Error('Voucher not found');
    }

    if (voucher.status !== 'ACTIVE') {
      throw new Error('Voucher is not active');
    }

    if (voucher.validUntil < new Date()) {
      throw new Error('Voucher has expired');
    }

    return this.prisma.voucher.update({
      where: { id: voucher.id },
      data: {
        status: 'REDEEMED',
        redeemedAt: new Date(),
        redeemedByStaffId: staffId,
      },
    });
  }

  async getActiveVouchers(familyId: string) {
    return this.prisma.voucher.findMany({
      where: {
        familyId,
        status: 'ACTIVE',
        validUntil: {
          gte: new Date(),
        },
      },
      orderBy: { issuedAt: 'desc' },
    });
  }
}
