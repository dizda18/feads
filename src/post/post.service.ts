import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/gql/dto/createPost.model';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  public async createPost(post: CreatePostDto): Promise<Post> {
    return this.postRepository.save(post);
  }

  public async findAll(userId: string): Promise<Post[]> {
    return this.postRepository.findBy({ createdById: userId });
  }

  public async findById(id: string): Promise<Post> {
    return this.postRepository.findOneBy({ id });
  }
}
