import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Query,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from '../dto/createPost.model';
import { LikePostDto } from '../dto/likePost.model';

const pubSub = new PubSub();

@Resolver((of) => Post)
class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query((returns) => Post)
  public async post(@Args('id') id: string): Promise<Post> {
    return this.postService.findById(id);
  }

  @Mutation((returns) => Post)
  public async createPost(
    @Args({ name: 'post', type: () => CreatePostDto }) post: CreatePostDto,
  ): Promise<Post> {
    const newPost: Promise<Post> = this.postService.createPost(post);
    pubSub.publish('postAdded', { postAdded: newPost });
    return newPost;
  }

  @Mutation((returns) => Post)
  public async likePost(
    @Args({ name: 'like', type: () => LikePostDto }) post: LikePostDto,
  ): Promise<Post> {
    const newPost: Promise<Post> = this.postService.likePost(post);
    pubSub.publish('postAdded', { postAdded: newPost });
    return newPost;
  }

  @ResolveField((returns) => User)
  public async createdBy(@Parent() post: Post): Promise<User> {
    const { createdById } = post;
    return this.userService.findById(createdById);
  }

  @Subscription((returns) => Post, {
    name: 'postAdded',
  })
  public postAdded() {
    return pubSub.asyncIterator('postAdded');
  }
}

export { PostResolver };
