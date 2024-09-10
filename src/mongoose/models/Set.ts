import mongoose, { Document, Schema } from 'mongoose';

export interface ISet extends Document {
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  released_at: string;
  block_code: string;
  block: string;
  parent_set_code: string;
  card_count: number;
  digital: boolean;
  foil_only: boolean;
  scryfall_set_uri: string;
  set_uri: string;
  icon_svg_uri: string;
  set_search_uri: string;
}

const SetSchema: Schema = new Schema({
  set_id: { type: String, required: true, unique: true },
  set: { type: String, required: true },
  set_name: { type: String, required: true },
  set_type: { type: String, required: true },
  released_at: { type: String, required: true },
  block_code: { type: String, required: false },
  block: { type: String, required: false },
  parent_set_code: { type: String, required: false },
  card_count: { type: Number, required: true },
  digital: { type: Boolean, required: true },
  foil_only: { type: Boolean, required: true },
  scryfall_set_uri: { type: String, required: true },
  set_uri: { type: String, required: true },
  icon_svg_uri: { type: String, required: true },
  set_search_uri: { type: String, required: true },
});

export default mongoose.model<ISet>('Set', SetSchema);