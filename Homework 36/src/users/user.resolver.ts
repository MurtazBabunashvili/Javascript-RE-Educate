import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UsersPayload } from './dto/user.payload';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';

@Resolver()
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => [UsersPayload], { nullable: true })
  getUsers() {
    return this.userService.findAll();
  }

  @Query(() => UsersPayload, { nullable: true })
  getUserById(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UsersPayload, { nullable: true })
  createUser(@Args('createUser') createUser: CreateUserInput) {
    return this.userService.create(createUser);
  }

  @Mutation(() => UsersPayload, { nullable: true })
  updateUser(
    @Args('id') id: string,
    @Args('updateUser') updateUser: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUser);
  }

  @Mutation(() => UsersPayload, { nullable: true })
  deleteUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
