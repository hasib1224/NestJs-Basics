import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt-cookie'))
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    
    const userId = req.headers.user as string;
    const cookies = req.headers.cookie;

    
  }
}
