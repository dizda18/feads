import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class FriendRequestDto {
  @Field()
  id: string;

  @Field()
  friendId: string;
}

export { FriendRequestDto };
