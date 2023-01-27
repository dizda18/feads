import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class CreatePostDto {
  id?: string;

  @Field()
  text: string;

  @Field()
  createdById: string;
}

export { CreatePostDto };
