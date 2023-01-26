import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
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

  @ResolveField()
  async posts(@Parent() user: User): Promise<Post[]> {
    const { id } = user;
    console.log(JSON.stringify(this.postService.findAll(id)));
    return this.postService.findAll(id);
  }

  @Mutation((returns) => User)
  async createUser(
    @Args({ name: 'user', type: () => CreateUserDto }) user: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(user);
  }
}

export { UserResolver };
