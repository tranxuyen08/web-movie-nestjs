import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './app.module';
import * as cookieParser from 'cookie-parser';
require("dotenv").config()

const SERVER_PORT = process.env.SERVER_PORT
async function bootstrap() {
  const app = await NestFactory.create(DatabaseModule);
  //middleware
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe());
  await app.listen( SERVER_PORT, () => {
    console.log(`Server running on port http://localhost:${SERVER_PORT}`);
  });
}
bootstrap();
