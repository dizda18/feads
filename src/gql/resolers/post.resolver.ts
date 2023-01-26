import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Query,
} from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from '../dto/createPost.model';

@Resolver((of) => Post)
class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Mutation((returns) => Post)
  async createPost(
    @Args({ name: 'post', type: () => CreatePostDto }) post: CreatePostDto,
  ): Promise<Post> {
    return this.postService.createPost(post);
  }

  @ResolveField((returns) => User)
  async createdBy(@Parent() post: Post): Promise<User> {
    const { createdById } = post;
    return this.userService.findById(createdById);
  }

  @Query((returns) => Post)
  async post(@Args('id') id: string): Promise<Post> {
    return this.postService.findById(id);
  }
}

export { PostResolver };
