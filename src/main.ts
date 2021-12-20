import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './app.config';
import { INestApplication } from '@nestjs/common';

function createSwaggerConfig(app: INestApplication) {
  const doc = new DocumentBuilder()
    .setTitle('Dock Banking')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, doc);

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  createSwaggerConfig(app);
  await app.listen(config.port);
}

bootstrap();
