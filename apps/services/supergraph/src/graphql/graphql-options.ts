import { ApolloDriverConfig } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { GqlOptionsFactory } from "@nestjs/graphql";
import { EmailAddressTypeDefinition, EmailAddressResolver } from 'graphql-scalars'
import { join } from 'node:path';

@Injectable()
export class GraphQLOptions implements GqlOptionsFactory {
    createGqlOptions(): Promise<ApolloDriverConfig> | ApolloDriverConfig {
        return {
            playground: process.env.NODE_ENV !== 'production',
            debug: process.env.NODE_ENV !== 'production',
            typePaths: ['./**/*.graphqls'],
            definitions: {
                path: join(process.cwd(), 'libs/graphql/src/generated/graphql.ts'),
                emitTypenameField: true,
                outputAs: 'interface',
                customScalarTypeMapping: {
                    EmailAddress: 'string'
                }
            },
            typeDefs:[
                EmailAddressTypeDefinition
            ],
            resolvers: {
                EmailAddress: EmailAddressResolver
            }
        }
    }
}