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
    id: ID!
    object: String
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
    legalities: Legalities!
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
    set_id: String!
    code: String!
    name: String!
    set_type: String!
    released_at: String!
    card_count: Int!
    digital: Boolean!
    foil_only: Boolean!
    nonfoil_only: Boolean!
    scryfall_uri: String!
    uri: String!
    search_uri: String!
    icon_svg_uri: String!
    arena_code: String
    mtgo_code: String
    tcgplayer_set_id: Int
  }

  type User {
    id: ID!
    sub: String!
    email: String!
    name: String!
    nickname: String!
    timestamp: String!
  }

  type DeckCard {
    card: Card!
    count: Int!
  }

  type Deck {
    id: ID!
    userId: String!
    name: String!
    legality: String!
    cards: [DeckCard!]!
    deckStats: DeckStats!
  }

  scalar JSON

  type DeckStats {
    totalCards: Int!
    totalUniqueCards: Int!
    totalLands: Int!
    totalCreatures: Int!
    totalPlaneswalkers: Int!
    totalArtifacts: Int!
    totalEnchantments: Int!
    totalInstants: Int!
    totalSorceries: Int!
    totalManaSymbols: JSON
    oneDrops: Int!
    twoDrops: Int!
    threePlusDrops: Int!
  }

  type DrawProbabilities {
    totalCards: Int!
    totalUniqueCards: Int!
    totalLands: LandDrawProbabilities!
    totalCreatures: Float!
    totalPlaneswalkers: Float!
    totalArtifacts: Float!
    totalEnchantments: Float!
    totalInstants: Float!
    totalSorceries: Float!
    oneDrops: Float!
    twoDrops: Float!
    threePlusDrops: Float!
  }

  type LandDrawProbabilities {
  one: Float!
  two: Float!
  three: Float!
  }
  

  type Query {
    cards(params: CardSearchParams): [Card]
    card(id: String!): Card
    sets(limit: Int, skip: Int): [Set]
    set(id: ID!): Set
    user: User
    decks(limit: Int, skip: Int): [Deck]
    decksByUser: [Deck]
    deck(id: ID!): Deck
    drawProbabilities(deckId: ID!, drawCount: Int!): DrawProbabilities!
    simulateStarterHand(deckId: ID!, drawCount: Int): [DeckCard]
  }

  type Mutation {
    createUser(sub: String!, email: String!, name: String!): User
    createDeck(name: String!, legality: String!, cards: [DeckCardInput!]): Deck
    addCardToDeck(deckId: String!, cardId: String!, count: Int!): Deck
    removeCardFromDeck(deckId: ID!, cardId: String!, count: Int!): Deck
    updateUser(name: String!, nickname: String!): User
    deleteDeck(deckId: ID!): Deck
    copyDeck(deckId: ID!, newName: String!): Deck
    editDeck(deckId: ID!, name: String!, legality: String!): Deck
  }

  input DeckCardInput {
    cardId: String!
    count: Int!
  }

  input CardSearchParams {
    limit: Int
    skip: Int
    lang: String
    color: String
    name: String
    type: String
    legalities: JSON
    setId: String
  }
`;

export default typeDefs;