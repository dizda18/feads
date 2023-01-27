import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class LikePostDto {
  @Field()
  postId: string;

  @Field()
  likedBy: string;
}

export { LikePostDto };
