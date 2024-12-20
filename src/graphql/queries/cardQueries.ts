import { set } from 'mongoose';
import Card from '../../mongoose/models/Card';

const cardQueries = {
  cards: async (_: any, { params }: { params: any }) => {
    const { limit, skip, lang, color, name, type, legalities, setId } = params || {};
    const filter: any = {};
    if (lang) filter.lang = lang;
    if (color) filter.color_identity = { $in: color.split(',') };
    if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive search
    if (type) filter.type_line = new RegExp(type, 'i'); // Case-insensitive search
    if (legalities) {
      Object.keys(legalities).forEach(key => {
        if (legalities[key] === "legal") {
          filter[`legalities.${key}`] = "legal";
        }
      });
    }
    if (setId) filter.set_id = setId;

    const cards = await Card.find(filter)
      .limit(limit || 0)
      .skip(skip || 0);
    return cards;
  },
  card: async (_: any, { id }: { id: string }) => {
    return await Card.findById(id);
  },
};

export default cardQueries;