import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';
import { AuthenticationModule } from 'src/modules/shared/authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    JwtModule.register({
      secret: 'topSecret92', // SECRET KEY
      signOptions: {
        expiresIn: 86400,
      },
    }),
    ,
    AuthenticationModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
