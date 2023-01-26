import { Field, InputType, Int } from '@nestjs/graphql';
// import { User } from 'src/user/user.entity';

@InputType()
class CreatePostDto {
  id?: string;

  @Field()
  text: string;

  //   @Field(() => [User])
  //   likedBy?: User[];

  @Field()
  createdById?: string;
}

export { CreatePostDto };
