import Card from '../mongoose/models/Card';
import Set from '../mongoose/models/Set';
import User from '../mongoose/models/User';
import Deck from '../mongoose/models/Deck';

const queries = {
  cards: async (_: any, { limit = 50, skip = 0, lang }: { limit?: number; skip?: number; lang?: string }) => {
    const query = lang ? { lang } : {};
    return await Card.find(query).limit(limit).skip(skip);
  },
  card: async (_: any, { id }: { id: string }) => {
    return await Card.findById(id);
  },
  sets: async (_: any, { limit = 50, skip = 0 }: { limit?: number; skip?: number }) => {
    return await Set.find().limit(limit).skip(skip);
  },
  set: async (_: any, { id }: { id: string }) => {
    return await Set.findById(id);
  },
  user: async (_: any, { sub }: { sub: string }) => {
    return await User.findOne({ sub });
  },
    decks: async (_: any, { limit = 20, skip = 0 }: { limit?: number; skip?: number }) => {
    return await Deck.find().limit(limit).skip(skip);
    },
    decksByUser: async (_: any, __: any, context: { req: any }) => {
    const user = context.req.user;
    if (!user) {
      throw new Error('Unauthorized');
    }
    return await Deck.find({ user: user._id });
    },
    deck: async (_: any, { id }: { id: string }) => {
    return await Deck.findById(id);
    },
};

export default queries;