import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [PostService, Post],
  exports: [PostService],
})
export class PostModule {}
