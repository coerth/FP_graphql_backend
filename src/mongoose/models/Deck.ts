import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICard, CardSchema } from './Card';

interface IDeckCard extends Document {
  card: ICard;
  count: number;
}

interface IDeckStats {
  totalCards: number;
  totalUniqueCards: number;
  totalLands: number;
  totalCreatures: number;
  totalPlaneswalkers: number;
  totalArtifacts: number;
  totalEnchantments: number;
  totalInstants: number;
  totalSorceries: number;
  totalManaSymbols: {
    [key: string]: number;
  };
  oneDrops: number;
  twoDrops: number;
  threePlusDrops: number;
}

interface IDeck extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  legality: string;
  cards: IDeckCard[];
  deckStats: IDeckStats;
  timestamp: Date;
}

const DeckCardSchema: Schema = new Schema({
  card: { type: CardSchema, required: true },
  count: { type: Number, required: true },
});

const DeckStatsSchema: Schema = new Schema({
  totalCards: { type: Number, default: 0 },
  totalUniqueCards: { type: Number, default: 0 },
  totalLands: { type: Number, default: 0 },
  totalCreatures: { type: Number, default: 0 },
  totalPlaneswalkers: { type: Number, default: 0 },
  totalArtifacts: { type: Number, default: 0 },
  totalEnchantments: { type: Number, default: 0 },
  totalInstants: { type: Number, default: 0 },
  totalSorceries: { type: Number, default: 0 },
  totalManaSymbols: {
    type: Map,
    of: Number,
    default: {
      W: 0,
      U: 0,
      B: 0,
      R: 0,
      G: 0,
      C: 0,
    },
  },
  oneDrops: { type: Number, default: 0 },
  twoDrops: { type: Number, default: 0 },
  threePlusDrops: { type: Number, default: 0 },
});

const DeckSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  legality: { type: String, required: true },
  cards: [DeckCardSchema],
  deckStats: { type: DeckStatsSchema, default: () => ({}) },
  timestamp: { type: Date, required: true, default: Date.now },
});

DeckSchema.index({ userId: 1, _id: 1, 'cards.card.id': 1 }, { unique: true });

const Deck: Model<IDeck> = mongoose.model<IDeck>('Deck', DeckSchema);

export default Deck;