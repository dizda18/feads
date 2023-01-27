import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { IDataloaders } from './dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  getLoaders(): IDataloaders {
    const postsByUserIdLoader = this.createPostsLoader();
    const likedPostsByUserIdLoader = this.createLikedPostsLoader();
    const friendsByUserIdLoader = this.createFriendsLoader();
    return {
      postsByUserIdLoader,
      friendsByUserIdLoader,
      likedPostsByUserIdLoader,
    };
  }

  private createPostsLoader(): DataLoader<string, Post[]> {
    return new DataLoader<string, Post[]>(
      async (keys: string[]) => await this.postService.findPostsByUserIds(keys),
    );
  }

  private createFriendsLoader(): DataLoader<string, User[]> {
    return new DataLoader<string, User[]>(
      async (keys: string[]) =>
        await this.userService.findFriendsByUserIds(keys),
    );
  }

  private createLikedPostsLoader(): DataLoader<string, Post[]> {
    return new DataLoader<string, Post[]>(
      async (keys: string[]) =>
        await this.userService.findLikedPostsByUserIds(keys),
    );
  }
}
