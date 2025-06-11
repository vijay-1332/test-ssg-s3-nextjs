// app/api/graphql/route.js
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import server from '../../../lib/apolloServer'; // Your ApolloServer instance

// The Next.js App Router handler for Apollo Server
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
