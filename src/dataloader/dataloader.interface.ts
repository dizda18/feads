import DataLoader from 'dataloader';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';

interface IDataloaders {
  postsByUserIdLoader: DataLoader<string, Post[]>;
  friendsByUserIdLoader: DataLoader<string, User[]>;
  likedPostsByUserIdLoader: DataLoader<string, Post[]>;
}

export { IDataloaders };
