import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });

  // 🔹 ValidationPipe GLOBAL (AQUI 👇)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,     // remove campos que não estão no DTO
      transform: true,     // transforma JSON em classe
      forbidNonWhitelisted: false,
    }),
  );

  app.use(json({ limit: '25mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.setGlobalPrefix('api'); // /api/...

  await app.listen(3000);
  console.log('🚀 API rodando em http://localhost:3000');
}
bootstrap();
