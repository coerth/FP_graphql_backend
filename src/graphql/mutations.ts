import userMutations from './mutations/userMutations';
import deckMutations from './mutations/deckMutations';
import cardMutations from './mutations//cardMutations';

const mutations = {
  ...userMutations,
  ...deckMutations,
  ...cardMutations,
};

export default mutations;