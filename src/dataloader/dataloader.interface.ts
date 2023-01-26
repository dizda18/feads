import DataLoader from 'dataloader';
import { Post } from 'src/post/post.entity';

interface IDataloaders {
  postsLoader: DataLoader<string, Post[]>;
}

export { IDataloaders };
