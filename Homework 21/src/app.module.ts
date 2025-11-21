import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
@Module({
  imports: [UserModule, PostModule],
})
export class AppModule {}
