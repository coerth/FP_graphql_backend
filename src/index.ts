import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import connectDB from './db';
import Card from './mongoose/models/Card';
import Set from './mongoose/models/Set';

// Connect to MongoDB
connectDB();

// Define a simple GraphQL schema
const schema = buildSchema(`
  type Card {
    id: ID!
    name: String!
    type_line: String!
    oracle_text: String!
    set_name: String!
  }

  type Set {
    id: ID!
    name: String!
    code: String!
    released_at: String!
  }

  type Query {
    getCard(id: ID!): Card
    getSet(id: ID!): Set
  }

  type Mutation {
    createCard(name: String!, type_line: String!, oracle_text: String!, set_name: String!): Card
    createSet(name: String!, code: String!, released_at: String!): Set
  }
`);

// Define resolvers
const root = {
  getCard: async ({ id }: { id: string }) => {
    return await Card.findById(id);
  },
  getSet: async ({ id }: { id: string }) => {
    return await Set.findById(id);
  },
  createCard: async ({ name, type_line, oracle_text, set_name }: { name: string, type_line: string, oracle_text: string, set_name: string }) => {
    const card = new Card({ name, type_line, oracle_text, set_name });
    return await card.save();
  },
  createSet: async ({ name, code, released_at }: { name: string, code: string, released_at: string }) => {
    const set = new Set({ name, code, released_at });
    return await set.save();
  },
};

// Set up Express server and GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});