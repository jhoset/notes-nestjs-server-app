import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? Setup Global API Prefix
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //? Setup DTO Validation - Transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,

      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //? Swagger Configuration
  const options = new DocumentBuilder()
    .setTitle('Notes App - API Documentation')
    .setDescription('API Description')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.PORT}`, 'Local Environment')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors();

  await app.listen(process.env.PORT);
  console.log(`>>> App running on port: ${process.env.PORT}`);
}

bootstrap();
