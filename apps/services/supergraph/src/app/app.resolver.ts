import { Resolver, Query, Args, ResolveField, ObjectType, Field,  } from "@nestjs/graphql";
import { ConsoleLogger } from "@nestjs/common";
import { User as UserType, IQuery, EmailAddress } from "@byndr/graphql";

@ObjectType()
export class User implements UserType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: EmailAddress;
}

@Resolver('User')
export class AppResolver {
  constructor(private readonly logger: ConsoleLogger) {}

  @Query(() => User, { name: 'user'})
  async user(@Args('id') id: string): Promise<User> {
    this.logger.log(`Fetching user with id: ${id}`);
    return {
        id,
        name: 'John Doe',
        email: 'john@doe.com'
    }
  }
}