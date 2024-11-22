import { Resolver, Query, Args, ResolveField, ObjectType, Field,  } from "@nestjs/graphql";
import { ConsoleLogger } from "@nestjs/common";
import { User, IQuery } from "@byndr/graphql";

// @ObjectType()
// class User implements UserType {
//   __typename?: "User";

//   @Field(type => String)
//   id: string;
//   name: string;
//   email: string;
// }

@Resolver()
export class AppResolver {
  constructor(private readonly logger: ConsoleLogger) {}

  // @Query(() => User, { nullable: true })
  // async user(@Args('id') id: string): Promise<User> {
  //   this.logger.log(`Fetching user with id: ${id}`);
  //   return {
  //       id,
  //       name: 'John Doe',
  //       email: 'john@doe.com'
  //   }
  // }
}