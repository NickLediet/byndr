import { ApolloDriverConfig } from "@nestjs/apollo";
import { merge } from "lodash"

type NestGraphQLOptions = {
    nodeEnv?: string,
    apolloDriverConfig?: ApolloDriverConfig
};

export function createGraphQLOptionsFactory(options: NestGraphQLOptions): () => ApolloDriverConfig {
    return () => merge(
        {
            playground: options.nodeEnv !== 'production',
            debug: options.nodeEnv !== 'production',
            typePaths: ['./**/*.graphql'],
            definitions: {
                emitTypenameField: true,
                outputAs: 'interface',
            },

        }, 
        options.apolloDriverConfig
    )
}
