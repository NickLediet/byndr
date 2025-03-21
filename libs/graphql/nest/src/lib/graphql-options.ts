import { ApolloDriverConfig } from "@nestjs/apollo";
import { merge } from "lodash"

type NestGraphQLOptions = {
    env?: string,
    apolloDriverConfig?: ApolloDriverConfig
};

export function createGraphQLOptionsFactory(options: NestGraphQLOptions): () => ApolloDriverConfig {
    return () => merge(
        {
            playground: options.env !== 'production',
            debug: options.env !== 'production',
            typePaths: ['./**/*.graphql'],
            definitions: {
                emitTypenameField: true,
                outputAs: 'interface',
            },

        }, 
        options.apolloDriverConfig
    )
}
