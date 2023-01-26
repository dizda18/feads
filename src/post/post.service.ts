import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/gql/dto/createPost.model';
import { In, Repository } from 'typeorm';
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

  public async findPostsByUserIds(ids: string[]): Promise<Post[][]> {
    const posts: Post[] = await this.postRepository.find({
      where: { createdById: In(ids) },
    });

    return this.mapResultToIds(posts);
  }

  private mapResultToIds(posts: Post[]) {
    const groupedPost: { [key: string]: Post[] } = posts.reduce(
      (groupObject: { [key: string]: Post[] }, post: Post) => {
        if (!groupObject[post.createdById]) {
          groupObject[post.createdById] = [];
        }

        groupObject[post.createdById].push(post);
        return groupObject;
      },
      {},
    );
    return Object.values(groupedPost);
  }
}
