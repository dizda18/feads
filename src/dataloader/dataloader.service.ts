import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { IDataloaders } from './dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(private readonly postService: PostService) {}

  getLoaders(): IDataloaders {
    const postsLoader = this.createFriendsLoader();
    return {
      postsLoader,
    };
  }

  private createFriendsLoader(): DataLoader<string, Post[]> {
    return new DataLoader<string, Post[]>(
      async (keys: string[]) => await this.postService.findPostsByUserIds(keys),
    );
  }
}
