import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DataloaderModule } from 'src/dataloader/dataloader.module';
import { DataloaderService } from 'src/dataloader/dataloader.service';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { FriendRequestDto } from './dto/addFriend.model';
import { CreatePostDto } from './dto/createPost.model';
import { CreateUserDto } from './dto/createUser.model';
import { LikePostDto } from './dto/likePost.model';
import { PostResolver } from './resolers/post.resolver';
import { UserResolver } from './resolers/user.resolver';

/**
 * https://docs.nestjs.com/graphql/quick-start
 */
@Module({
  imports: [
    UserModule,
    PostModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: './schema.gql',
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': true,
          },
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
      inject: [DataloaderService],
    }),
  ],
  providers: [
    CreateUserDto,
    CreatePostDto,
    LikePostDto,
    FriendRequestDto,
    UserResolver,
    PostResolver,
  ],
})
export class GqlModule {}
