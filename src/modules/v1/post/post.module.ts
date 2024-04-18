import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Post])],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
