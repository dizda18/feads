import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class CreateUserDto {
  id: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
}

export { CreateUserDto };
