import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });

  app.use(json({ limit: '25mb' }));  // permite JSON grande
  app.use(urlencoded({ limit: '50mb', extended: true })); // body grande com arquivo base64


  await app.listen(3000);
}
bootstrap();
