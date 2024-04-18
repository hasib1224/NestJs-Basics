import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { Request } from 'express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const userId = req.headers.user as string;
    const cookies = req.headers.cookie;

    if (!userId) {
      throw new HttpException(
        'User not authenticated',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const newPost = await this.postService.createPost(createPostDto, userId);
      return newPost;
    } catch (error) {
      throw new HttpException(
        'Failed to create post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
