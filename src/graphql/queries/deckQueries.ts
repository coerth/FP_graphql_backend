import Deck from '../../mongoose/models/Deck';

const deckQueries = {
  decks: async (_: any, { limit = 20, skip = 0 }: { limit?: number; skip?: number }) => {
    return await Deck.find().limit(limit).skip(skip);
  },
  decksByUser: async (_: any, __: any, context: { req: any }) => {
    const user = context.req.user;
    if (!user) {
      throw new Error('Unauthorized');
    }
    return await Deck.find({ userId: user._id });
  },
  deck: async (_: any, { id }: { id: string }) => {
    return await Deck.findById(id);
  },
};

export default deckQueries;