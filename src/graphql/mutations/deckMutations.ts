import Deck from '../../mongoose/models/Deck';
import Card from '../../mongoose/models/Card';
import { ICard } from '../../mongoose/models/Card';
import mongoose from 'mongoose';

const deckMutations = {
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
      userId: user._id,
      name,
      legality,
      cards,
      timestamp: new Date().toISOString(),
    });
    await deck.save();
    return deck;
  },

  deleteDeck: async (
    _: any,
    { deckId }: { deckId: string },
    context: { req: any }
  ) => {
    const user = context.req.user;
    if (!user) {
      throw new Error('Unauthorized');
    }
  
    const deck = await Deck.findById(deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
  
    if (deck.userId.toString() !== user._id.toString()) {
      throw new Error('Unauthorized');
    }
  
    await Deck.deleteOne({ _id: deckId });
    return deck;
  },

  copyDeck: async (
    _: any,
    { deckId, newName }: { deckId: string, newName: string },
    context: { req: any }
  ) => {
    const user = context.req.user;
    if (!user) {
      throw new Error('Unauthorized');
    }
  
    const deck = await Deck.findById(deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
  
    const copiedDeck = new Deck({
      userId: user._id,
      name: newName,
      legality: deck.legality,
      cards: deck.cards,
      deckStats: deck.deckStats,
      timestamp: new Date().toISOString(),
    });
    await copiedDeck.save();
    return copiedDeck;
  },

  editDeck: async (
    _: any,
    { deckId, name, legality }: { deckId: string; name: string; legality: string },
    context: { req: any }
  ) => {
    const user = context.req.user;
    if (!user) {
      throw new Error('Unauthorized');
    }

    const deck = await Deck.findById(deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }

    if (deck.userId.toString() !== user._id.toString()) {
      throw new Error('Unauthorized');
    }

    deck.name = name;
    deck.legality = legality;
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

      if (deck.userId.toString() !== user._id.toString()) {
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
        deck.deckStats.totalUniqueCards += 1;
      }

      // Update deckStats
      deck.deckStats.totalCards += count;
      const types = card.type_line.split(' ');
      types.forEach(type => {
        if (type === 'Land') deck.deckStats.totalLands += count;
        else if (type === 'Creature') deck.deckStats.totalCreatures += count;
        else if (type === 'Planeswalker') deck.deckStats.totalPlaneswalkers += count;
        else if (type === 'Artifact') deck.deckStats.totalArtifacts += count;
        else if (type === 'Enchantment') deck.deckStats.totalEnchantments += count;
        else if (type === 'Instant') deck.deckStats.totalInstants += count;
        else if (type === 'Sorcery') deck.deckStats.totalSorceries += count;
      });

      if (card.cmc == 1) deck.deckStats.oneDrops += count;
      else if (card.cmc == 2) deck.deckStats.twoDrops += count;
      else deck.deckStats.threePlusDrops += count;

      if (card.color_identity.length === 0) {
        // Handle colorless cards (artifacts)
        deck.deckStats.totalManaSymbols.set("C", (deck.deckStats.totalManaSymbols.get("C") as number || 0) + count);
      } else {
        card.color_identity.forEach(color => {
          const currentCount = deck.deckStats.totalManaSymbols.get(color) || 0;
          deck.deckStats.totalManaSymbols.set(color, currentCount + count);
        });
      }

      await deck.save();
      return deck;
    } catch (error) {
      console.error("Error in addCardToDeck:", error);
      throw error;
    }
  },

  removeCardFromDeck: async (
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

      if (deck.userId.toString() !== user._id.toString()) {
        throw new Error('Unauthorized');
      }

      const existingCardIndex = deck.cards.findIndex((deckCard) => deckCard.card.id.toString() === cardId);
      if (existingCardIndex === -1) {
        throw new Error('Card not found in deck');
      }

      const existingCard = deck.cards[existingCardIndex];
      if (existingCard.count < count) {
        throw new Error('Not enough cards to remove');
      }

      existingCard.count -= count;
      if (existingCard.count === 0) {
        deck.cards.splice(existingCardIndex, 1);
        deck.deckStats.totalUniqueCards -= 1;
      }

      // Update deckStats
      deck.deckStats.totalCards -= count;
      const types = existingCard.card.type_line.split(' ');
      types.forEach(type => {
        if (type === 'Land') deck.deckStats.totalLands -= count;
        else if (type === 'Creature') deck.deckStats.totalCreatures -= count;
        else if (type === 'Planeswalker') deck.deckStats.totalPlaneswalkers -= count;
        else if (type === 'Artifact') deck.deckStats.totalArtifacts -= count;
        else if (type === 'Enchantment') deck.deckStats.totalEnchantments -= count;
        else if (type === 'Instant') deck.deckStats.totalInstants -= count;
        else if (type === 'Sorcery') deck.deckStats.totalSorceries -= count;
      });

      if (existingCard.card.cmc == 1) deck.deckStats.oneDrops -= count;
      else if (existingCard.card.cmc == 2) deck.deckStats.twoDrops -= count;
      else deck.deckStats.threePlusDrops -= count;

      if (existingCard.card.color_identity.length === 0) {
        // Handle colorless cards (artifacts)
        const currentCount = deck.deckStats.totalManaSymbols.get("C") || 0;
        deck.deckStats.totalManaSymbols.set("C", Math.max(0, currentCount - count));
      } else {
        existingCard.card.color_identity.forEach(color => {
          const currentCount = deck.deckStats.totalManaSymbols.get(color) || 0;
          deck.deckStats.totalManaSymbols.set(color, Math.max(0, currentCount - count));
        });
      }

      await deck.save();
      return deck;
    } catch (error) {
      console.error("Error in removeCardFromDeck:", error);
      throw error;
    }
  },
};

export default deckMutations;