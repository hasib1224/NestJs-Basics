import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { middleware } from './app.middleware';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_API_ROOT } from './common/swagger/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform:true,
    }),
  );

  middleware(app);

  await app.listen(3000);
}
bootstrap();
