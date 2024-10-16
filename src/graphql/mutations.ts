import User from '../mongoose/models/User';
import Deck from '../mongoose/models/Deck';
import { ICard } from '../mongoose/models/Card';
import { time } from 'console';

const mutations = {
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

  createDeck: async (
    _: any,
    { name, legality, cards }: { name: string; legality: string; cards: { card: ICard; count: number }[] },
    context: { req: any }
  ) => {
    const user = context.req.user;
    if (!user) {
      throw new Error('Unauthorized');
    }

    const deck = new Deck({
      user: user._id,
      name,
      legality,
      cards,
      timestamp: new Date().toISOString(),
    });
    await deck.save();
    return deck;
  },

};


export default mutations;