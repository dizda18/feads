import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @ManyToMany(() => Post, (post) => post.likedBy)
  @Field(() => [Post], { nullable: true })
  likedPosts?: Post[];

  @OneToMany(() => Post, (post) => post.createdBy, {})
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}

export { User };
