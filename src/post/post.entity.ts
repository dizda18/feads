import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  text: string;

  @ManyToMany(() => User, (user) => user.likedPosts)
  @Field(() => [User])
  likedBy?: User[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'created_by_id' })
  @Field(() => User)
  createdBy?: User;

  @Column({ name: 'created_by_id' })
  createdById: string;
}

export { Post };
