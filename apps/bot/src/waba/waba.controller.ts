import { Body, Controller, Get, Post, Query, Logger } from '@nestjs/common';
import { WabaService } from './waba.service';
import type { WhatsAppWebhook } from '@teddy/shared';

@Controller('webhooks/whatsapp')
export class WabaController {
  private readonly logger = new Logger(WabaController.name);

  constructor(private wabaService: WabaService) {}

  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    this.logger.log(`Webhook verification: mode=${mode}, token=${token}`);

    if (mode === 'subscribe' && this.wabaService.verifyWebhook(token)) {
      this.logger.log('Webhook verified successfully');
      return challenge;
    }

    this.logger.error('Webhook verification failed');
    return 'Forbidden';
  }

  @Post()
  async handleWebhook(@Body() webhook: WhatsAppWebhook) {
    this.logger.log('Received webhook:', JSON.stringify(webhook, null, 2));

    try {
      // Process webhook events
      for (const entry of webhook.entry) {
        for (const change of entry.changes) {
          if (change.value.messages) {
            for (const message of change.value.messages) {
              await this.processMessage(message, change.value.metadata.phone_number_id);
            }
          }

          if (change.value.statuses) {
            for (const status of change.value.statuses) {
              this.logger.log(`Message status update: ${status.id} -> ${status.status}`);
            }
          }
        }
      }

      return { success: true };
    } catch (error) {
      this.logger.error('Error processing webhook:', error);
      return { success: false, error: error.message };
    }
  }

  private async processMessage(message: any, phoneNumberId: string) {
    this.logger.log(`Processing message from ${message.from}: ${message.type}`);

    // TODO: Implement message processing logic
    // - Handle text messages
    // - Handle interactive button/list replies  
    // - Route to appropriate handlers based on conversation state
    
    if (message.type === 'text') {
      this.logger.log(`Text message: ${message.text.body}`);
    } else if (message.type === 'interactive') {
      this.logger.log(`Interactive message: ${JSON.stringify(message.interactive)}`);
    }
  }
}
