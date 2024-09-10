import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type ImageUris {
    small: String
    normal: String
    large: String
    png: String
    art_crop: String
    border_crop: String
  }

  type Prices {
    usd: String
    usd_foil: String
    usd_etched: String
    eur: String
    eur_foil: String
    tix: String
  }

  type Legalities {
    standard: String
    future: String
    historic: String
    gladiator: String
    pioneer: String
    explorer: String
    modern: String
    legacy: String
    pauper: String
    vintage: String
    penny: String
    commander: String
    brawl: String
    historicbrawl: String
    alchemy: String
    paupercommander: String
    duel: String
    oldschool: String
    premodern: String
  }

  type Card {
    object: String
    id: String
    oracle_id: String
    multiverse_ids: [Int]
    mtgo_id: Int
    arena_id: Int
    tcgplayer_id: Int
    name: String
    lang: String
    released_at: String
    uri: String
    scryfall_uri: String
    layout: String
    highres_image: Boolean
    image_status: String
    image_uris: ImageUris
    mana_cost: String
    cmc: Float
    type_line: String
    oracle_text: String
    colors: [String]
    color_identity: [String]
    keywords: [String]
    produced_mana: [String]
    legalities: Legalities
    games: [String]
    reserved: Boolean
    foil: Boolean
    nonfoil: Boolean
    finishes: [String]
    oversized: Boolean
    promo: Boolean
    reprint: Boolean
    variation: Boolean
    set_id: String
    set_code: String
    set_name: String
    set_type: String
    set_uri: String
    set_search_uri: String
    scryfall_set_uri: String
    rulings_uri: String
    prints_search_uri: String
    collector_number: String
    digital: Boolean
    rarity: String
    card_back_id: String
    artist: String
    artist_ids: [String]
    illustration_id: String
    border_color: String
    frame: String
    full_art: Boolean
    textless: Boolean
    booster: Boolean
    story_spotlight: Boolean
    prices: Prices
    related_uris: [String]
    purchase_uris: [String]
  }

  type Set {
    set_id: ID!
    set: String!
    set_name: String!
    set_type: String!
    released_at: String!
    block_code: String
    block: String
    parent_set_code: String
    card_count: Int!
    digital: Boolean!
    foil_only: Boolean!
    scryfall_set_uri: String!
    set_uri: String!
    icon_svg_uri: String!
    set_search_uri: String!
  }

  type Query {
    cards: [Card]
    card(id: String!): Card
    sets: [Set]
    set(id: ID!): Set
  }
`;

export default typeDefs;