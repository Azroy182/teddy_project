import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfirmVisitDtoType } from '@teddy/shared';
import { handleError, handleSuccess } from '../common/utils';

@Controller('loyalty')
export class LoyaltyController {
  constructor(private loyaltyService: LoyaltyService) {}

  @Get('progress/:familyId')
  @UseGuards(JwtAuthGuard)
  async getLoyaltyProgress(@Param('familyId') familyId: string) {
    try {
      const progress = await this.loyaltyService.getLoyaltyProgress(familyId);
      return handleSuccess(progress);
    } catch (error) {
      return handleError(error);
    }
  }

  @Post('visit')
  @UseGuards(JwtAuthGuard)
  async recordVisit(@Body() dto: ConfirmVisitDtoType) {
    try {
      // Используем новую систему кодов
      const result = await this.loyaltyService.confirmVisitByCode(dto);
      return handleSuccess(result);
    } catch (error) {
      return handleError(error);
    }
  }

  @Post('issue-code')
  @UseGuards(JwtAuthGuard)
  async issueVisitCode(@Body() dto: { familyId: string; staffId?: string }) {
    try {
      const result = await this.loyaltyService.issueVisitCode(dto.familyId, dto.staffId);
      return handleSuccess(result);
    } catch (error) {
      return handleError(error);
    }
  }
}
