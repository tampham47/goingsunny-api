import userQueries from './user/queries';
import sessionQueries from './session/queries';

export default {
  queries: {
    ...userQueries,
    ...sessionQueries,
  },
};
