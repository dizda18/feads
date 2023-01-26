import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [],
  providers: [UserService, User],
  exports: [UserService],
})
export class UserModule {}
