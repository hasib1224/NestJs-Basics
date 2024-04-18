import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/v1/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './modules/v1/authentication/authentication.module';
import { PostModule } from './modules/v1/post/post.module';
import { AuthModule } from './modules/shared/auth/auth.module';
import { DatabaseModule } from './modules/shared/database/database.module';



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
  PostModule,
  AuthModule,
  DatabaseModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
