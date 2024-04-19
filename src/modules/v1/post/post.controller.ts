import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Response } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { Request } from 'express';
import { CookieAuthGuard } from 'src/modules/shared/authentication/guards/auth.guard';
import { AuthInterceptor } from 'src/common/interceptor/auth.interceptor';
import { CurrentUser } from 'src/common/decorator/user.decorator';


@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(CookieAuthGuard)
  @UseInterceptors(AuthInterceptor)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: Request,@CurrentUser() user: any) {
    
    const post=this.postService.createPost(createPostDto,user.userId);

  }
}
