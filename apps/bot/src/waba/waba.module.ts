import { Module } from '@nestjs/common';
import { WabaService } from './waba.service';
import { WabaController } from './waba.controller';
import { ConversationService } from './conversation.service';
import { MessageProcessorService } from './message-processor.service';
import { UtilityMessagesService } from './utility-messages.service';
import { I18nService } from './i18n.service';
import { FamiliesModule } from '../families/families.module';

@Module({
  imports: [FamiliesModule],
  controllers: [WabaController],
  providers: [
    WabaService,
    ConversationService,
    MessageProcessorService,
    UtilityMessagesService,
    I18nService,
  ],
  exports: [WabaService, ConversationService, UtilityMessagesService],
})
export class WabaModule {}
