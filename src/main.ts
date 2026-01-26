import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * ===============================
   * CORS (DEV + PROD)
   * ===============================
   */
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://acampajovem.com.br',
    'https://www.acampajovem.com.br',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // permite chamadas sem origin (Postman, mobile, server-side)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'), false);
    },
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });

  /**
   * ===============================
   * VALIDATION PIPE (GLOBAL)
   * ===============================
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  /**
   * ===============================
   * BODY LIMITS
   * ===============================
   */
  app.use(json({ limit: '25mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  /**
   * ===============================
   * PREFIXO GLOBAL
   * ===============================
   */
  app.setGlobalPrefix('api'); // /api/...

  /**
   * ===============================
   * SERVER
   * ===============================
   */
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 API Acampa Jovem rodando na porta ${port}`);
}

bootstrap();
