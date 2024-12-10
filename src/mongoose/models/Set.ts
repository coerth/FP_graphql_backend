import mongoose, { Document, Schema } from 'mongoose';

export interface ISet extends Document {
  set_id: string;
  code: string;
  name: string;
  set_type: string;
  released_at: string;
  card_count: number;
  digital: boolean;
  foil_only: boolean;
  nonfoil_only: boolean;
  scryfall_uri: string;
  uri: string;
  search_uri: string;
  icon_svg_uri: string;
  arena_code?: string;
  mtgo_code?: string;
  tcgplayer_set_id?: number;
}

const SetSchema: Schema = new Schema({
  set_id: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  set_type: { type: String, required: true },
  released_at: { type: String, required: true },
  card_count: { type: Number, required: true },
  digital: { type: Boolean, required: true },
  foil_only: { type: Boolean, required: true },
  nonfoil_only: { type: Boolean, required: true },
  scryfall_uri: { type: String, required: true },
  uri: { type: String, required: true },
  search_uri: { type: String, required: true },
  icon_svg_uri: { type: String, required: true },
  arena_code: { type: String, required: false },
  mtgo_code: { type: String, required: false },
  tcgplayer_set_id: { type: Number, required: false },
});

const Set = mongoose.model<ISet>('Set', SetSchema);

export default Set;