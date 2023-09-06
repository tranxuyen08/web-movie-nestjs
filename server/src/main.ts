require("dotenv").config()
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import cors from 'cors';


const SERVER_PORT = process.env.SERVER_PORT
async function bootstrap() {
  const app = await NestFactory.create(DatabaseModule);
  const corsOrigin = [
    'https://project-reactjs-nodejs-movie-pmc7.vercel.app',
    'http://localhost:3000',
    'http://localhost:3030',
    'http://localhost:8000',
    'https://project-reactjs-nodejs-movie-tnyl.vercel.app',
  ];

  //middleware
  const corsOptions = {
    origin: corsOrigin,
    credentials: true, // access-control-allow-credentials: true
    optionsSuccessStatus: 200, // Sửa tên thuộc tính thành optionsSuccessStatus
  };

  app.enableCors(corsOptions);

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe());
  await app.listen( SERVER_PORT, () => {
    console.log(`Server running on port http://localhost:${SERVER_PORT}`);
  });
}
bootstrap();
