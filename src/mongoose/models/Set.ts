import mongoose, { Document, Schema } from 'mongoose';

export interface ISet extends Document {
  id: string;
  code: string;
  name: string;
  type: string;
  released_at: string;
  block_code: string;
  block: string;
  parent_set_code: string;
  card_count: number;
  digital: boolean;
  foil_only: boolean;
  scryfall_uri: string;
  uri: string;
  icon_svg_uri: string;
  search_uri: string;
}

const SetSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  released_at: { type: String, required: true },
  block_code: { type: String, required: false },
  block: { type: String, required: false },
  parent_set_code: { type: String, required: false },
  card_count: { type: Number, required: true },
  digital: { type: Boolean, required: true },
  foil_only: { type: Boolean, required: true },
  scryfall_uri: { type: String, required: true },
  uri: { type: String, required: true },
  icon_svg_uri: { type: String, required: true },
  search_uri: { type: String, required: true },
});

export default mongoose.model<ISet>('Set', SetSchema);