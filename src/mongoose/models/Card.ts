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
    standard: string;
      future: string;
      historic: string;
      gladiator: string;
      pioneer: string;
      explorer: string;
      modern: string;
      legacy: string;
      pauper: string;
      vintage: string;
      penny:  string;
      commander: string;
      brawl: string;
      historicbrawl: string;
      alchemy: string;
      paupercommander: string;
      duel: string;
      oldschool: string;
      premodern: string;
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

export const CardSchema: Schema = new Schema({
  object: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  oracle_id: { type: String, required: true },
  multiverse_ids: { type: [Number], required: true },
  mtgo_id: { type: Number, required: false },
  arena_id: { type: Number, required: false },
  tcgplayer_id: { type: Number, required: false },
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
  oracle_text: { type: String, required: false },
  colors: { type: [String], required: false },
  color_identity: { type: [String], required: true },
  keywords: { type: [String], required: false },
  produced_mana: { type: [String], required: true },
  legalities: {
    standard: { type: String, required: true },
    future: { type: String, required: true },
    historic: { type: String, required: true },
    timeless: { type: String, required: true },
    gladiator: { type: String, required: true },
    pioneer: { type: String, required: true },
    explorer: { type: String, required: true },
    modern: { type: String, required: true },
    legacy: { type: String, required: true },
    pauper: { type: String, required: true },
    vintage: { type: String, required: true },
    penny: { type: String, required: true },
    commander: { type: String, required: true },
    oathbreaker: { type: String, required: true },
    standardbrawl: { type: String, required: true },
    brawl: { type: String, required: true },
    alchemy: { type: String, required: true },
    paupercommander: { type: String, required: true },
    duel: { type: String, required: true },
    oldschool: { type: String, required: true },
    premodern: { type: String, required: true },
    predh: { type: String, required: true },
  },
  games: { type: [String], required: false },
  reserved: { type: Boolean, required: false },
  foil: { type: Boolean, required: false },
  nonfoil: { type: Boolean, required: false },
  finishes: { type: [String], required: false },
  oversized: { type: Boolean, required: false },
  promo: { type: Boolean, required: false },
  reprint: { type: Boolean, required: false },
  variation: { type: Boolean, required: false },
  set_id: { type: String, required: true },
  set_code: { type: String, required: false }, // Renamed from 'set' to 'set_code'
  set_name: { type: String, required: true },
  set_type: { type: String, required: false },
  set_uri: { type: String, required: false },
  set_search_uri: { type: String, required: false },
  scryfall_set_uri: { type: String, required: false },
  rulings_uri: { type: String, required: false },
  prints_search_uri: { type: String, required: false },
  collector_number: { type: String, required: false },
  digital: { type: Boolean, required: false },
  rarity: { type: String, required: false },
  card_back_id: { type: String, required: false },
  artist: { type: String, required: false },
  artist_ids: { type: [String], required: false },
  illustration_id: { type: String, required: false },
  border_color: { type: String, required: false },
  frame: { type: String, required: false },
  full_art: { type: Boolean, required: false },
  textless: { type: Boolean, required: false },
  booster: { type: Boolean, required: false },
  story_spotlight: { type: Boolean, required: false },
  prices: {
    usd: { type: String, required: false },
    usd_foil: { type: String, required: false },
    usd_etched: { type: String, required: false },
    eur: { type: String, required: false },
    eur_foil: { type: String, required: false },
    tix: { type: String, required: false },
  },
  related_uris: { type: Map, of: String, required: false },
  purchase_uris: { type: Map, of: String, required: false },
});

export default mongoose.model<ICard>('Card', CardSchema);