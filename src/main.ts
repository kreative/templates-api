import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  // adds cross origin reference abilities, including exposing headers
  // we have to add new domain names for each service that needs to access Kreative ID
  app.enableCors({
    exposedHeaders: ['KREATIVE_ID_KEY', 'KREATIVE_AIDN', 'KREATIVE_APPCHAIN'],
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://kreativetemplates.co',
      'https://kreativetemplates.co',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'OPTIONS'],
    credentials: true,
  });

  // removes any data from request bodies that don't fit the DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // adds /v1 before any route, used for API versioning
  app.setGlobalPrefix('/v1');

  logger.info(
    `Templates-API starting on port: ${PORT} in environment: ${process.env.NODE_ENV}`,
  );
  await app.listen(PORT);
}
bootstrap();
