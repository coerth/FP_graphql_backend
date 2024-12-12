import Card from '../../mongoose/models/Card';
import sanitize from 'sanitize-html';

const cardQueries = {
  cards: async (_: any, { params }: { params: any }) => {
    const { limit, skip, lang, color, name, type, legalities, setId } = params || {};

    // Sanitize user input
    const sanitizedParams = {
      limit: sanitize(limit),
      skip: sanitize(skip),
      lang: sanitize(lang),
      color: sanitize(color),
      name: sanitize(name),
      type: sanitize(type),
      legalities: sanitize(legalities),
      setId: sanitize(setId),
    };

    const filter: any = {};
    if (sanitizedParams.lang) filter.lang = sanitizedParams.lang;
    if (sanitizedParams.color) filter.color_identity = { $in: sanitizedParams.color.split(',') };
    if (sanitizedParams.name) filter.name = new RegExp(sanitizedParams.name, 'i'); // Case-insensitive search
    if (sanitizedParams.type) filter.type_line = new RegExp(sanitizedParams.type, 'i'); // Case-insensitive search
    if (sanitizedParams.legalities) {
      const legalities = JSON.parse(sanitizedParams.legalities);
      Object.keys(legalities).forEach(key => {
        if (legalities[key] === "legal") {
          filter[`legalities.${key}`] = "legal";
        }
      });
    }
    if (sanitizedParams.setId) filter.set_id = sanitizedParams.setId;

    const cards = await Card.find(filter)
      .limit(parseInt(sanitizedParams.limit) || 0)
      .skip(parseInt(sanitizedParams.skip) || 0);
    return cards;
  },
};

export default cardQueries;