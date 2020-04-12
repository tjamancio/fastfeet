import { combineReducers } from 'redux';

import auth from './auth/duck';
import user from './user/duck';

const reducers = combineReducers({
  // Remova essa linha depois de adicionar seus ducks
  auth,
  user,
});

export default reducers;
