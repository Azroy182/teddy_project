import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import * as puppeteer from 'puppeteer';
// import * as path from 'path';
// import * as fs from 'fs/promises';
import type { Language } from '@teddy/shared';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(private configService: ConfigService) {}

  async generateLoyaltyCard(
    familyId: string,
    clientCode: string,
    current: number,
    target: number,
    _language: Language = 'EN'
  ): Promise<string> {
    // TODO: Implement with Puppeteer later
    this.logger.warn('Loyalty card generation is mocked - Puppeteer not available');
    const baseUrl = this.configService.get('BASE_URL') || 'http://localhost:8080';
    return `${baseUrl}/storage/cards/mock-loyalty-${familyId}.png`;
  }

  async generateVoucher(
    voucherId: string,
    code: string,
    clientCode: string,
    validUntil: Date,
    _language: Language = 'EN'
  ): Promise<string> {
    // TODO: Implement with Puppeteer later
    this.logger.warn('Voucher generation is mocked - Puppeteer not available');
    const baseUrl = this.configService.get('BASE_URL') || 'http://localhost:8080';
    return `${baseUrl}/storage/vouchers/mock-voucher-${voucherId}.png`;
  }

  private getLoyaltyCardHTML(clientCode: string, current: number, target: number, language: Language): string {
    const title = language === 'PT' ? 'Cartão de Fidelidade' : 'Loyalty Card';
    const progress = language === 'PT' ? 'Progresso' : 'Progress';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 40px;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #8B4513 0%, #228B22 100%);
            color: white;
            width: 1120px;
            height: 548px;
            box-sizing: border-box;
          }
          .card {
            text-align: center;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .title {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 30px;
          }
          .client-code {
            font-size: 36px;
            margin-bottom: 40px;
            background: rgba(255,255,255,0.2);
            padding: 10px 20px;
            border-radius: 10px;
          }
          .progress {
            font-size: 32px;
            margin-bottom: 30px;
          }
          .stamps {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
          }
          .stamp {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            border: 4px solid #FFD700;
          }
          .stamp.filled {
            background: #FFD700;
            color: #8B4513;
          }
          .stamp.empty {
            background: rgba(255,255,255,0.1);
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="title">${title}</div>
          <div class="client-code">${clientCode}</div>
          <div class="progress">${progress}: ${current}/${target}</div>
          <div class="stamps">
            ${Array.from({ length: target }, (_, i) => `
              <div class="stamp ${i < current ? 'filled' : 'empty'}">
                ${i < current ? '★' : '☆'}
              </div>
            `).join('')}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getVoucherHTML(code: string, clientCode: string, validUntil: Date, language: Language): string {
    const title = language === 'PT' ? 'VOUCHER GRÁTIS' : 'FREE VOUCHER';
    const subtitle = language === 'PT' ? '1 Hora Grátis' : '1 Hour Free';
    const validText = language === 'PT' ? 'Válido até' : 'Valid until';
    const validDate = validUntil.toLocaleDateString(language === 'PT' ? 'pt-PT' : 'en-US');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 40px;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(45deg, #FFD700 0%, #FFA500 100%);
            color: #8B4513;
            width: 1120px;
            height: 548px;
            box-sizing: border-box;
          }
          .voucher {
            text-align: center;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .title {
            font-size: 56px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .subtitle {
            font-size: 40px;
            margin-bottom: 30px;
          }
          .code {
            font-size: 48px;
            font-weight: bold;
            background: white;
            padding: 15px 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            border: 4px solid #8B4513;
          }
          .client-code {
            font-size: 24px;
            margin-bottom: 20px;
          }
          .valid-until {
            font-size: 20px;
          }
          .qr-placeholder {
            position: absolute;
            bottom: 40px;
            right: 40px;
            width: 100px;
            height: 100px;
            background: white;
            border: 2px solid #8B4513;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="voucher">
          <div class="title">${title}</div>
          <div class="subtitle">${subtitle}</div>
          <div class="code">${code}</div>
          <div class="client-code">${clientCode}</div>
          <div class="valid-until">${validText}: ${validDate}</div>
          <div class="qr-placeholder">QR CODE</div>
        </div>
      </body>
      </html>
    `;
  }
}
