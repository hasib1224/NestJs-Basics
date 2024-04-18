import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';


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
  PostModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
