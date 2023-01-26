import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { IDataloaders } from 'src/dataloader/dataloader.interface';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../dto/createUser.model';

@Resolver((of) => User)
class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Query((returns) => User)
  async user(@Args({ name: 'id' }) id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Query((returns) => [User])
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ResolveField()
  async posts(
    @Parent() user: User,
    @Context() { loaders }: { loaders: IDataloaders },
  ): Promise<Post[]> {
    const { id } = user;
    return loaders.postsLoader.load(id);
  }

  @Mutation((returns) => User)
  async createUser(
    @Args({ name: 'user', type: () => CreateUserDto }) user: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(user);
  }
}

export { UserResolver };
