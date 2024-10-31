import queries from './queries';
import mutations from './mutations';
import GraphQLJSON from 'graphql-type-json';

const resolvers = {
  JSON: GraphQLJSON,
  Query: queries,
  Mutation: mutations,
};

export default resolvers;