// post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private  postRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const { title, description } = createPostDto;
    const post = new Post();
    post.title = title;
    post.description = description;
    post.user.id = userId; 
    console.log("userId",userId)

    return this.postRepository.save(post);
  }
}
