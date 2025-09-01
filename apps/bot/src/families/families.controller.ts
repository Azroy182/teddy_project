import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto, ApiResponse } from '@teddy/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('families')
@UseGuards(JwtAuthGuard)
export class FamiliesController {
  constructor(private familiesService: FamiliesService) {}

  @Post()
  async createFamily(@Body() dto: CreateFamilyDto): Promise<ApiResponse> {
    try {
      const family = await this.familiesService.createFamily(dto);
      return {
        success: true,
        data: family,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get('search')
  async searchFamilies(@Query('q') query: string): Promise<ApiResponse> {
    try {
      const families = await this.familiesService.searchFamilies(query);
      return {
        success: true,
        data: families,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get(':id')
  async getFamily(@Param('id') id: string): Promise<ApiResponse> {
    try {
      const family = await this.familiesService.findById(id);
      if (!family) {
        return {
          success: false,
          error: 'Family not found',
        };
      }
      return {
        success: true,
        data: family,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
