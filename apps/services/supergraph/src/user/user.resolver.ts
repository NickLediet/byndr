import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { IMutation, IQuery } from '@byndr/graphql';

@Resolver('User')
export class UserResolver implements IQuery/* , IMutation */ {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query('users')
  users() {
    return this.userService.findAll();
  }

  @Query('user')
  user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  // @Mutation('updateUser')
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation('removeUser')
  // removeUser(@Args('id') id: number) {
  //   return this.userService.remove(id);
  // }
}
