import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RedeemVoucherDto, ApiResponse } from '@teddy/shared';

@Controller('vouchers')
@UseGuards(JwtAuthGuard)
export class VouchersController {
  constructor(private vouchersService: VouchersService) {}

  @Post('redeem')
  async redeemVoucher(@Body() dto: RedeemVoucherDto): Promise<ApiResponse> {
    try {
      const voucher = await this.vouchersService.redeemVoucher(dto.code, dto.staffId);
      return {
        success: true,
        data: voucher,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get('family/:familyId')
  async getFamilyVouchers(@Param('familyId') familyId: string): Promise<ApiResponse> {
    try {
      const vouchers = await this.vouchersService.getActiveVouchers(familyId);
      return {
        success: true,
        data: vouchers,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
