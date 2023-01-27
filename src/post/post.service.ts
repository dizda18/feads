import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/gql/dto/createPost.model';
import { LikePostDto } from 'src/gql/dto/likePost.model';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
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

    return this.mapResultToIds(ids, posts);
  }

  public async likePost(likePostDto: LikePostDto): Promise<Post> {
    const user: User = await this.userService.findById(likePostDto.likedBy);
    const post: Post = await this.postRepository.findOneBy({
      id: likePostDto.postId,
    });

    if (!post.likedBy) {
      post.likedBy = [];
    }
    post.likedBy.push(user);

    return await this.postRepository.save(post);
  }

  private mapResultToIds(userIds: string[], posts: Post[]) {
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

    return userIds.map((userId) => groupedPost[userId] || []);
  }
}
