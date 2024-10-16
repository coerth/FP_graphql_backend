import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICard, CardSchema } from './Card';

interface IDeckCard extends Document {
  card: ICard;
  count: number;
}

interface IDeck extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  legality: string;
  cards: IDeckCard[];
  timestamp: Date;
}

const DeckCardSchema: Schema = new Schema({
  card: { type: CardSchema, required: true },
  count: { type: Number, required: true },
});

const DeckSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  legality: { type: String, required: true },
  cards: [DeckCardSchema],
  timestamp: { type: Date, required: true, default: Date.now },
});

const Deck: Model<IDeck> = mongoose.model<IDeck>('Deck', DeckSchema);

export default Deck;