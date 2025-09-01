import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('healthz')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async check() {
    let dbStatus = 'disconnected';
    let dbError = null;

    try {
      // Test database connection
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch (error) {
      dbError = error instanceof Error ? error.message : 'Unknown error';
    }

    return {
      status: 'ok', // API is always OK even without DB for testing
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
      ...(dbError && { dbError }),
    };
  }
}
