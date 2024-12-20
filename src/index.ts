import express, { Application } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import connectDB from './mongoose/db';
import cors from 'cors';
import conditionalAuth from './middleware/conditionalAuth';


const startServer = async () => {
  const app: Application = express();

  app.use(cors());

  app.use(conditionalAuth);

  // Create a new ApolloServer instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the Apollo Server
  await server.start();

  // Middleware for Express and Apollo Server
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  // Connect to MongoDB
  connectDB();

  // Start Express Server
  const port = 4000;
  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}/graphql`);
  });
};

startServer();
