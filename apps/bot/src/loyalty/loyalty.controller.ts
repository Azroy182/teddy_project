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
      // TODO: Implement visit code validation
      // For now, assume familyId is passed directly
      const familyId = dto.code; // Temporary hack
      
      const result = await this.loyaltyService.incrementVisit(familyId, dto.staffId);
      return handleSuccess(result);
    } catch (error) {
      return handleError(error);
    }
  }
}
