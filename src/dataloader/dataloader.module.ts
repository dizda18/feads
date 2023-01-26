import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { PostService } from 'src/post/post.service';
// import DataLoader from 'dataloader';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [PostModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
