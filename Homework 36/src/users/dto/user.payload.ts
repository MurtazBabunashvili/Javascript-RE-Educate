import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsersPayload {
  @Field()
  _id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  age: string;
}
