import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Language } from '@teddy/shared';

export interface WabaClient {
  sendMessage(to: string, message: string): Promise<void>;
  sendTemplate(to: string, templateName: string, language: Language, variables?: Record<string, string>): Promise<void>;
  sendImage(to: string, imageUrl: string, caption?: string): Promise<void>;
}

@Injectable()
export class WabaClientMock implements WabaClient {
  private readonly logger = new Logger(WabaClientMock.name);

  async sendMessage(to: string, message: string): Promise<void> {
    this.logger.log(`[MOCK] Sending message to ${to}: ${message}`);
  }

  async sendTemplate(to: string, templateName: string, language: Language, variables?: Record<string, string>): Promise<void> {
    this.logger.log(`[MOCK] Sending template ${templateName} (${language}) to ${to}`, variables);
  }

  async sendImage(to: string, imageUrl: string, caption?: string): Promise<void> {
    this.logger.log(`[MOCK] Sending image to ${to}: ${imageUrl} with caption: ${caption}`);
  }
}

@Injectable()
export class WabaService {
  private readonly logger = new Logger(WabaService.name);
  private readonly client: WabaClient;

  constructor(private configService: ConfigService) {
    // For now, always use mock client
    this.client = new WabaClientMock();
  }

  async sendWelcomeMessage(waId: string, clientCode: string, language: Language) {
    const template = language === 'PT' ? 'welcome_pt' : 'welcome_en';
    await this.client.sendTemplate(waId, template, language, { clientCode });
  }

  async sendLoyaltyProgress(waId: string, current: number, target: number, language: Language, cardImageUrl?: string) {
    if (cardImageUrl) {
      await this.client.sendImage(waId, cardImageUrl, `Progress: ${current}/${target}`);
    } else {
      await this.client.sendMessage(waId, `Your progress: ${current}/${target} visits`);
    }
  }

  async sendVoucherIssued(waId: string, voucherCode: string, language: Language, voucherImageUrl?: string) {
    if (voucherImageUrl) {
      await this.client.sendImage(waId, voucherImageUrl, `Your voucher: ${voucherCode}`);
    } else {
      await this.client.sendMessage(waId, `🎉 Voucher ready! Code: ${voucherCode}`);
    }
  }

  async sendCheckoutMessage(waId: string, language: Language) {
    const template = language === 'PT' ? 'checkout_pt' : 'checkout_en';
    await this.client.sendTemplate(waId, template, language);
  }

  verifyWebhook(token: string): boolean {
    const verifyToken = this.configService.get('WABA_VERIFY_TOKEN');
    return token === verifyToken;
  }

  verifySignature(payload: string, signature: string): boolean {
    // TODO: Implement HMAC signature verification
    this.logger.warn('Signature verification not implemented yet');
    return true;
  }
}
