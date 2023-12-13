import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as env from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

env.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipUndefinedProperties: false,
      skipNullProperties: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
