import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findUserById(@Args('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }
}
