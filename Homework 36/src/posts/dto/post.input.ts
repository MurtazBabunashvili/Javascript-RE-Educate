import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  description: string;
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;
}
