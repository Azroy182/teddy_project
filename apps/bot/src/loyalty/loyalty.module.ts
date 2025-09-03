import { Module } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controller';
import { VisitCodesService } from './visit-codes.service';
import { VisitCodesController } from './visit-codes.controller';

@Module({
  controllers: [LoyaltyController, VisitCodesController],
  providers: [LoyaltyService, VisitCodesService],
  exports: [LoyaltyService, VisitCodesService],
})
export class LoyaltyModule {}
