import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [PostModule, UserModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
