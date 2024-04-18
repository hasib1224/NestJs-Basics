import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Post } from 'src/post/post.entity';



@Module({
  imports: [TypeOrmModule.forFeature([User,Post])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
