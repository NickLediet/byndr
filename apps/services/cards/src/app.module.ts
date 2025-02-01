import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EmailAddressTypeDefinition, EmailAddressResolver } from "graphql-scalars";
import { createGraphQLOptionsFactory } from '@byndr/graphql-nest';
import { join } from 'node:path';
import { CardResolver } from './card/card.resolver';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: createGraphQLOptionsFactory({
        env: process.env.NODE_ENV,
        apolloDriverConfig: {
          typePaths: ['./**/*.graphql'],
          definitions: {
            path: join(process.cwd(), 'apps/services/card/src/graphql.schema.ts'),
          },
        }
      }),
    })
  ],
  providers: [CardResolver],
})
export class AppModule {}
