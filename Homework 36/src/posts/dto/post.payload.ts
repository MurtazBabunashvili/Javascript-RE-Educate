import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostsPayload {
  @Field()
  _id: string;

  @Field()
  title: string;

  @Field()
  description: string;
}
