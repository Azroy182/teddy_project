import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import type { Language, ApiResponse } from '@teddy/shared';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  async getMenu(@Query('lang') lang?: Language): Promise<ApiResponse> {
    try {
      const menu = await this.menuService.getMenu(lang || 'EN');
      return {
        success: true,
        data: menu,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
