import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './entities/post.entity';
import { PostsResolver } from './post.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'post', schema: postSchema }])],
  controllers: [],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
