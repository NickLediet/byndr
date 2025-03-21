import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { EmailAddressTypeDefinition, EmailAddressResolver } from "graphql-scalars";
import { createGraphQLOptionsFactory } from '@byndr/graphql-nest';
import { join } from 'node:path';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: createGraphQLOptionsFactory({
        env: process.env.NODE_ENV,
        apolloDriverConfig: {
          typePaths: ['./**/*.graphql'],
          definitions: {
            path: join(process.cwd(), 'apps/services/supergraph/src/graphql.schema.ts'),
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
