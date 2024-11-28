import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EmailAddressTypeDefinition, EmailAddressResolver } from "graphql-scalars";
import { createGraphQLOptionsFactory } from '@byndr/graphql-nest';
import { join } from 'node:path';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: createGraphQLOptionsFactory({
        nodeEnv: process.env.NODE_ENV,
        apolloDriverConfig: {
          typePaths: ['./**/*.graphql'],
          definitions: {
            path: join(process.cwd(), 'libs/graphql/src/generated/graphql.ts'),
            customScalarTypeMapping: {
                EmailAddress: "string"
            }
          },
          // Note when adding a scalar from `graphql-scalars` 
          // you need to specify the "definitions.customScalarTypeMapping" property
          typeDefs: [
            EmailAddressTypeDefinition
          ],
          resolvers: {
            EmailAddress: EmailAddressResolver
          }
        }
      }),
    }),
    UserModule
  ],
})
export class AppModule {}
