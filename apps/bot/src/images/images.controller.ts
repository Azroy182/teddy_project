import { Controller, Get, Param, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { ImagesService } from './images.service';
import type { Language } from '@teddy/shared';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get('loyalty/:familyId.png')
  async getLoyaltyCard(
    @Param('familyId') familyId: string,
    @Query('clientCode') clientCode: string,
    @Query('current') current: string,
    @Query('target') target: string,
    @Query('lang') lang: Language = 'EN',
    @Res() res: Response,
  ) {
    try {
      const imageUrl = await this.imagesService.generateLoyaltyCard(
        familyId,
        clientCode,
        parseInt(current) || 0,
        parseInt(target) || 5,
        lang,
      );
      
      res.redirect(imageUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  @Get('voucher/:voucherId.png')
  async getVoucher(
    @Param('voucherId') voucherId: string,
    @Query('code') code: string,
    @Query('clientCode') clientCode: string,
    @Query('validUntil') validUntil: string,
    @Query('lang') lang: Language = 'EN',
    @Res() res: Response,
  ) {
    try {
      const imageUrl = await this.imagesService.generateVoucher(
        voucherId,
        code,
        clientCode,
        new Date(validUntil),
        lang,
      );
      
      res.redirect(imageUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
