import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
      },
    }),
  );

  const configService = app.get(ConfigService);

  // Security - commented out for now due to Fastify compatibility
  // await app.register(helmet, {
  //   contentSecurityPolicy: false,
  // });

  // CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8080',
      configService.get('BASE_URL'),
    ].filter(Boolean),
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  const port = configService.get('PORT') || 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
