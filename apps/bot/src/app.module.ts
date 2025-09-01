import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FamiliesModule } from './families/families.module';
import { MenuModule } from './menu/menu.module';
import { WabaModule } from './waba/waba.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { ImagesModule } from './images/images.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'storage'),
      serveRoot: '/storage',
    }),
    PrismaModule,
    AuthModule,
    FamiliesModule,
    MenuModule,
    WabaModule,
    LoyaltyModule,
    VouchersModule,
    ImagesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
