import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Post } from './post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Post])],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
