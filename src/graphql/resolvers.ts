import Card from '../mongoose/models/Card';
import Set from '../mongoose/models/Set';
import User from '../mongoose/models/User';

const resolvers = {
  Query: {
    cards: async (_: any, { limit = 50, skip = 0, lang }: { limit?: number; skip?: number; lang?: string }) => {
      const query = lang ? { lang } : {};
      return await Card.find(query).limit(limit).skip(skip);
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
    user: async (_: any, { sub }: { sub: string }) => {
      return await User.findOne({ sub });
    },
  },
  Mutation: {
    createUser: async (_: any, { sub, email, name }: { sub: string; email: string; name: string }) => {
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          sub,
          email,
          name,
          nickname: name, // Assuming nickname is the same as name initially
          timestamp: new Date().toISOString(), // Set timestamp to current date and time
        });
        await user.save();
      }
      return user;
    },
  },
};

export default resolvers;