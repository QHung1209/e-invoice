/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// Must run before any module that reads process.env at import time
// (e.g. the Configuration singleton), so `.env` is loaded first.
// import 'dotenv/config';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const config = AppModule.CONFIGURATION;

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(config.GLOBAL_PREFIX);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.enableCors({ origin: '*' });

    const swConfig = new DocumentBuilder()
      .setTitle('Einvoice-bff API')
      .setDescription('E-Invoice BFF API')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
      })
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, swConfig);
    SwaggerModule.setup(`${config.GLOBAL_PREFIX}/docs`, app, documentFactory());

    await app.listen(config.APP_CONFIG.PORT);

    Logger.log(`🚀 Application is running on: http://localhost:${config.APP_CONFIG.PORT}/${config.GLOBAL_PREFIX}`);

    Logger.log(`🚀 Swagger docs available on: http://localhost:${config.APP_CONFIG.PORT}/${config.GLOBAL_PREFIX}/docs`);
  } catch (error) {
    Logger.error('Error when bootstrap application', error);
  }
}

bootstrap();
