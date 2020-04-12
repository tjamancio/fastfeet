import { produce } from 'immer';
import { handleActions } from 'redux-actions';

import { SIGN_IN_SUCCESS, SIGN_OUT } from '../auth/duck';

const defaultState = {
  profile: null,
};

const reducer = handleActions(
  {
    [SIGN_IN_SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.profile = payload;
      }),
    [SIGN_OUT]: () => defaultState,
  },
  defaultState
);

export default reducer;
