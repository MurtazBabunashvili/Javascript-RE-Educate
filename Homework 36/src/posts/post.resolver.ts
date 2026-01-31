import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostsPayload } from './dto/post.payload';
import { CreatePostInput, UpdatePostInput } from './dto/post.input';

@Resolver()
export class PostsResolver {
  constructor(private postService: PostsService) {}

  @Query(() => [PostsPayload], { nullable: true })
  getAllPosts() {
    return this.postService.findAll();
  }

  @Query(() => PostsPayload, { nullable: true })
  getPostById(@Args('id') id: string) {
    return this.postService.findOne(id);
  }

  @Mutation(() => PostsPayload, { nullable: true })
  createPost(@Args('createPost') createPost: CreatePostInput) {
    return this.postService.create(createPost);
  }

  @Mutation(() => PostsPayload, { nullable: true })
  updatePost(
    @Args('id') id: string,
    @Args('updatePost') updatePost: UpdatePostInput,
  ) {
    return this.postService.update(id, updatePost);
  }

  @Mutation(() => PostsPayload, { nullable: true })
  deletePost(@Args('id') id: string) {
    return this.postService.remove(id);
  }
}
