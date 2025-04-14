import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { AppModule } from './app.module';
import { TimezoneMiddleware } from './timezone-middleware/timezone-middleware.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(new TimezoneMiddleware().use);
  // app.useStaticAssets(path.join(__dirname, '..', 'upload'), {
  //   prefix: '/public/',
  // });
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['http://localhost:3000', '*'],
  });

  await app.listen(8001);
}
bootstrap();
