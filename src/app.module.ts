import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { GqlModule } from './gql/gql.module';
// import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { DataloaderModule } from './dataloader/dataloader.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'feed',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    GqlModule,
    PostModule,
    DataloaderModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
