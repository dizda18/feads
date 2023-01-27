import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';
import {
  Column,
  Entity,
  JoinTable,
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
  @JoinTable()
  likedPosts?: Post[];

  // @Column({ name: 'liked_posts_id', nullable: true })
  // likedPostsId?: string;

  @OneToMany(() => Post, (post) => post.createdBy)
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @ManyToMany(() => User)
  @JoinTable()
  @Field(() => [User], { nullable: true })
  friends?: User[];
}

export { User };
