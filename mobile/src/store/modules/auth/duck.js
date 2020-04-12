import { produce } from 'immer';
import { createAction, handleActions } from 'redux-actions';

const defaultState = {
  signed: false,
  loading: false,
};

export const SIGN_IN_REQUEST = '@AUTH/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = '@AUTH/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = '@AUTH/SIGN_IN_FAILURE';
export const SIGN_OUT = '@AUTH/SIGN_OUT';

export const signInRequest = createAction(SIGN_IN_REQUEST);
export const signInSuccess = createAction(SIGN_IN_SUCCESS);
export const signInFailure = createAction(SIGN_IN_FAILURE);
export const signOut = createAction(SIGN_OUT);

const reducer = handleActions(
  {
    [SIGN_IN_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.loading = true;
      }),
    [SIGN_IN_SUCCESS]: (state) =>
      produce(state, (draft) => {
        draft.signed = true;
        draft.loading = false;
      }),
    [SIGN_IN_FAILURE]: (state) =>
      produce(state, (draft) => {
        draft.loading = false;
      }),
    [SIGN_OUT]: () => defaultState,
  },
  defaultState
);

export default reducer;
