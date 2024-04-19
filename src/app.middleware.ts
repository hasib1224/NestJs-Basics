import type { INestApplication } from '@nestjs/common';
import { setupSwagger } from './common/swagger';
import * as cookieParser from 'cookie-parser';


export function middleware(app: INestApplication): INestApplication {

  app.use(cookieParser());

  setupSwagger(app);

  app.enableCors({
    credentials: true,
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });

  return app;
}


