import cardQueries from './queries/cardQueries';
import setQueries from './queries/setQueries';
import userQueries from './queries/userQueries';
import deckQueries from './queries/deckQueries';
import statQueries from './queries/statQueries';

const queries = {
  ...cardQueries,
  ...setQueries,
  ...userQueries,
  ...deckQueries,
  ...statQueries,
};

export default queries;