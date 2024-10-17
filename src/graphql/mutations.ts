import { ObjectId } from 'mongodb';
import User from '../mongoose/models/User';
import Deck from '../mongoose/models/Deck';
import Card from '../mongoose/models/Card';
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
  addCardToDeck: async (
    _: any,
    { deckId, cardId, count }: { deckId: string; cardId: string; count: number },
    context: { req: any }
  ) => {

    try {
      const user = context.req.user;
      if (!user) {
        throw new Error('Unauthorized');
      }

      const deck = await Deck.findById(deckId);
      if (!deck) {
        throw new Error('Deck not found');
      }

      if (deck.user.toString() !== user._id.toString()) {
        throw new Error('Unauthorized');
      }

      const card = await Card.findOne({ id: cardId });
      if (!card) {
        throw new Error('Card not found');
      }

      const existingCardIndex = deck.cards.findIndex((deckCard) => deckCard.card.id.toString() === cardId);
        if (existingCardIndex > -1) {
          deck.cards[existingCardIndex].count += count;
        } else {
          deck.cards.push({ card: card.toObject(), count });
        }

      await deck.save();
      return deck;
    }
    catch (error) {
      console.error("Error in addCardToDeck:", error);
      throw error;
    }
  },
};


export default mutations;