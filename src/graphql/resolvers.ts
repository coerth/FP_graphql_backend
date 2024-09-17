import Card from '../mongoose/models/Card';
import Set from '../mongoose/models/Set';

const resolvers = {
  Query: {
    cards: async (_: any, { limit = 50, skip = 0 }: { limit?: number; skip?: number }) => {
      return await Card.find().limit(limit).skip(skip);
    },
    card: async (_: any, { id }: { id: string }) => {
      return await Card.findById(id);
    },
    sets: async (_: any, { limit = 50, skip = 0 }: { limit?: number; skip?: number }) => {
      return await Set.find().find().limit(limit).skip(skip);;
    },
    set: async (_: any, { id }: { id: string }) => {
      return await Set.findById(id);
    },
  },
};

export default resolvers;