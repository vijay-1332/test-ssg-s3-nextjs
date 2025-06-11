// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  // Determine the absolute URL for the GraphQL API
  // In a real application, you might use environment variables for this
  const isServer = typeof window === 'undefined';
  const uri = isServer 
    ? (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) 
    : '/api/graphql';

  return new ApolloClient({
    link: new HttpLink({
      uri: uri, 
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
