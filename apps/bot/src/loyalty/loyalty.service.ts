import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import type { ConfirmVisitDtoType } from '@teddy/shared';
import { VisitCodesService } from './visit-codes.service';

@Injectable()
export class LoyaltyService {
  private readonly logger = new Logger(LoyaltyService.name);
  private readonly loyaltyTarget: number;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private visitCodesService: VisitCodesService,
  ) {
    this.loyaltyTarget = this.configService.get<number>('LOYALTY_TARGET', 5);
  }

  async getLoyaltyProgress(familyId: string) {
    const counter = await this.prisma.loyaltyCounter.findUnique({
      where: { familyId },
    });

    if (!counter) {
      return {
        current: 0,
        target: this.loyaltyTarget,
        percentage: 0,
      };
    }

    return {
      current: counter.currentCycleCount,
      target: this.loyaltyTarget,
      percentage: Math.round((counter.currentCycleCount / this.loyaltyTarget) * 100),
    };
  }

  async incrementVisit(familyId: string, staffId?: string) {
    // Check for rapid visits (anti-fraud)
    const recentVisit = await this.prisma.visit.findFirst({
      where: {
        familyId,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        },
      },
    });

    if (recentVisit) {
      throw new Error('Recent visit detected. Please wait before recording another visit.');
    }

    // Create visit record
    const visit = await this.prisma.visit.create({
      data: {
        familyId,
        source: 'CODE', // Default source
        staffId,
      },
    });

    // Update loyalty counter
    const counter = await this.prisma.loyaltyCounter.upsert({
      where: { familyId },
      create: {
        familyId,
        currentCycleCount: 1,
        totalVisits: 1,
      },
      update: {
        currentCycleCount: {
          increment: 1,
        },
        totalVisits: {
          increment: 1,
        },
      },
    });

    this.logger.log(`Visit recorded for family ${familyId}: ${counter.currentCycleCount}/${this.loyaltyTarget}`);

    // Check if loyalty target reached
    let voucherIssued = false;
    if (counter.currentCycleCount >= this.loyaltyTarget) {
      voucherIssued = await this.issueVoucher(familyId);
      
      // Reset cycle counter
      await this.prisma.loyaltyCounter.update({
        where: { familyId },
        data: { currentCycleCount: 0 },
      });
    }

    return {
      visit,
      loyaltyProgress: {
        current: voucherIssued ? 0 : counter.currentCycleCount,
        target: this.loyaltyTarget,
        percentage: voucherIssued ? 0 : Math.round((counter.currentCycleCount / this.loyaltyTarget) * 100),
      },
      voucherIssued,
    };
  }

  // Новый метод для подтверждения визита по коду
  async confirmVisitByCode(dto: ConfirmVisitDtoType) {
    return await this.visitCodesService.confirmCode(dto);
  }

  // Выдача кода для семьи
  async issueVisitCode(familyId: string, staffId?: string) {
    return await this.visitCodesService.issueCode({ familyId }, staffId);
  }

  private async issueVoucher(familyId: string): Promise<boolean> {
    try {
      // Generate voucher code
      const code = this.generateVoucherCode();
      
      // Calculate expiry date
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 30); // 30 days validity

      // Create voucher
      await this.prisma.voucher.create({
        data: {
          familyId,
          code,
          validUntil,
          signature: this.generateVoucherSignature(code, familyId),
        },
      });

      this.logger.log(`Voucher issued for family ${familyId}: ${code}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to issue voucher for family ${familyId}:`, error);
      return false;
    }
  }

  private generateVoucherCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private generateVoucherSignature(code: string, familyId: string): string {
    // TODO: Implement HMAC signature
    return Buffer.from(`${code}:${familyId}`).toString('base64');
  }
}
