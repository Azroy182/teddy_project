import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import type { Language } from '@teddy/shared';
import { handleError, handleSuccess } from '../common/utils';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  async getMenu(@Query('lang') lang?: Language) {
    try {
      const menu = await this.menuService.getMenu(lang || 'EN');
      return handleSuccess(menu);
    } catch (error) {
      return handleError(error);
    }
  }
}
