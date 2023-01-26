import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { CreatePostDto } from './dto/createPost.model';
import { CreateUserDto } from './dto/createUser.model';
import { PostResolver } from './resolers/post.resolver';
import { UserResolver } from './resolers/user.resolver';

/**
 * https://docs.nestjs.com/graphql/quick-start
 */
@Module({
  imports: [
    UserModule,
    PostModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [CreateUserDto, CreatePostDto, UserResolver, PostResolver],
})
export class GqlModule {}
