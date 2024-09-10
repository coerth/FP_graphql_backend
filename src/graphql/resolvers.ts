import Card from '../mongoose/models/Card';
import Set from '../mongoose/models/Set';

const resolvers = {
  Query: {
    cards: async () => {
      return await Card.find();
    },
    card: async (_: any, { id }: { id: string }) => {
      return await Card.findById(id);
    },
    sets: async () => {
      return await Set.find();
    },
    set: async (_: any, { id }: { id: string }) => {
      return await Set.findById(id);
    },
  },
};

export default resolvers;