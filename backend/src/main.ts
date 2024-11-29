import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'], // Opcional: Reduce los niveles de logs
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Authorization', 'Content-Type'], // Cabeceras permitidas
  });

  await app.listen(3000); // IMPORTANTE: Asegúrate de escuchar en un puerto
}
bootstrap();
