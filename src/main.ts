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

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const config = new DocumentBuilder()
    .setTitle('Basic NestJS App')
    .setDescription('Auth Api Description')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  await app.listen(3000);
}
bootstrap();
