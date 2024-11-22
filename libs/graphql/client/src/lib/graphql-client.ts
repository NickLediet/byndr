import { ApolloClient, InMemoryCache } from '@apollo/client';
export * from '@apollo/client';

export function createGraphqlClient() {
  return new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  })
}