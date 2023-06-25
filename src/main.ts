import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session')
import {config} from 'dotenv'
config()

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['secret']
  }))
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  await app.listen(5000);
}

bootstrap();