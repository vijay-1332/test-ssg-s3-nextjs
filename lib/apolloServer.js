// /lib/apolloServer.js
import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from '../graphql/server/blogSchema'; // Import the schema and resolvers

// Create Apollo Server instance with typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server;
