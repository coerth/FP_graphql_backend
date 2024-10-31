import Set from '../../mongoose/models/Set';

const setQueries = {
  sets: async (_: any, { limit = 50, skip = 0 }: { limit?: number; skip?: number }) => {
    return await Set.find().limit(limit).skip(skip);
  },
  set: async (_: any, { id }: { id: string }) => {
    return await Set.findById(id);
  },
};

export default setQueries;