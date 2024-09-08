import mongoose, { Document, Schema } from 'mongoose';

export interface ICard extends Document {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id: number;
  arena_id: number;
  tcgplayer_id: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text: string;
  colors: string[];
  color_identity: string[];
  keywords: string[];
  produced_mana: string[];
  legalities: {
    [key: string]: string;
  };
  games: string[];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
  set_code: string; // Renamed from 'set' to 'set_code'
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: string;
  card_back_id: string;
  artist: string;
  artist_ids: string[];
  illustration_id: string;
  border_color: string;
  frame: string;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  prices: {
    usd: string | null;
    usd_foil: string | null;
    usd_etched: string | null;
    eur: string | null;
    eur_foil: string | null;
    tix: string | null;
  };
  related_uris: {
    [key: string]: string;
  };
  purchase_uris: {
    [key: string]: string;
  };
}

const CardSchema: Schema = new Schema({
  object: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  oracle_id: { type: String, required: true },
  multiverse_ids: { type: [Number], required: true },
  mtgo_id: { type: Number, required: true },
  arena_id: { type: Number, required: true },
  tcgplayer_id: { type: Number, required: true },
  name: { type: String, required: true },
  lang: { type: String, required: true },
  released_at: { type: String, required: true },
  uri: { type: String, required: true },
  scryfall_uri: { type: String, required: true },
  layout: { type: String, required: true },
  highres_image: { type: Boolean, required: true },
  image_status: { type: String, required: true },
  image_uris: {
    small: { type: String, required: true },
    normal: { type: String, required: true },
    large: { type: String, required: true },
    png: { type: String, required: true },
    art_crop: { type: String, required: true },
    border_crop: { type: String, required: true },
  },
  mana_cost: { type: String, required: false },
  cmc: { type: Number, required: true },
  type_line: { type: String, required: true },
  oracle_text: { type: String, required: true },
  colors: { type: [String], required: false },
  color_identity: { type: [String], required: true },
  keywords: { type: [String], required: false },
  produced_mana: { type: [String], required: true },
  legalities: { type: Map, of: String, required: true },
  games: { type: [String], required: true },
  reserved: { type: Boolean, required: true },
  foil: { type: Boolean, required: true },
  nonfoil: { type: Boolean, required: true },
  finishes: { type: [String], required: true },
  oversized: { type: Boolean, required: true },
  promo: { type: Boolean, required: true },
  reprint: { type: Boolean, required: true },
  variation: { type: Boolean, required: true },
  set_id: { type: String, required: true },
  set_code: { type: String, required: true }, // Renamed from 'set' to 'set_code'
  set_name: { type: String, required: true },
  set_type: { type: String, required: true },
  set_uri: { type: String, required: true },
  set_search_uri: { type: String, required: true },
  scryfall_set_uri: { type: String, required: true },
  rulings_uri: { type: String, required: true },
  prints_search_uri: { type: String, required: true },
  collector_number: { type: String, required: true },
  digital: { type: Boolean, required: true },
  rarity: { type: String, required: true },
  card_back_id: { type: String, required: true },
  artist: { type: String, required: true },
  artist_ids: { type: [String], required: true },
  illustration_id: { type: String, required: true },
  border_color: { type: String, required: true },
  frame: { type: String, required: true },
  full_art: { type: Boolean, required: true },
  textless: { type: Boolean, required: true },
  booster: { type: Boolean, required: true },
  story_spotlight: { type: Boolean, required: true },
  prices: {
    usd: { type: String, required: false },
    usd_foil: { type: String, required: false },
    usd_etched: { type: String, required: false },
    eur: { type: String, required: false },
    eur_foil: { type: String, required: false },
    tix: { type: String, required: false },
  },
  related_uris: { type: Map, of: String, required: true },
  purchase_uris: { type: Map, of: String, required: true },
});

export default mongoose.model<ICard>('Card', CardSchema);