import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfirmVisitDto, ApiResponse } from '@teddy/shared';

@Controller('loyalty')
export class LoyaltyController {
  constructor(private loyaltyService: LoyaltyService) {}

  @Get('progress/:familyId')
  @UseGuards(JwtAuthGuard)
  async getLoyaltyProgress(@Param('familyId') familyId: string): Promise<ApiResponse> {
    try {
      const progress = await this.loyaltyService.getLoyaltyProgress(familyId);
      return {
        success: true,
        data: progress,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Post('visit')
  @UseGuards(JwtAuthGuard)
  async recordVisit(@Body() dto: ConfirmVisitDto): Promise<ApiResponse> {
    try {
      // TODO: Implement visit code validation
      // For now, assume familyId is passed directly
      const familyId = dto.code; // Temporary hack
      
      const result = await this.loyaltyService.incrementVisit(familyId, dto.staffId);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
