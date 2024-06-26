import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/v1/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/v1/post/post.module';
import { DatabaseModule } from './modules/shared/database/database.module';
import { AuthenticationModule } from './modules/shared/authentication/authentication.module';


@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nestblog',
    autoLoadEntities: true,
    synchronize: true,
  }),
  UserModule,
  AuthenticationModule,
  // PostModule,
  DatabaseModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
