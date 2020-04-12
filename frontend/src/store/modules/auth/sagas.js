import { toast } from 'react-toastify';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import {
  signInSuccess,
  SIGN_IN_REQUEST,
  signInFailure,
  SIGN_OUT,
} from './duck';

function* signin({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, '/sessions', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/orders');
  } catch (err) {
    yield put(signInFailure());
    toast.error('Falha na autenticação, verique seus dados');
  }

}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(SIGN_IN_REQUEST, signin),
  takeLatest(SIGN_OUT, signOut),
]);
