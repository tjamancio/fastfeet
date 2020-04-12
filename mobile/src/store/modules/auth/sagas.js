import { Alert } from 'react-native';

import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, SIGN_IN_REQUEST, signInFailure } from './duck';

function* signin({ payload }) {
  try {
    const { data } = yield call(api.post, '/deliverymen/sessions', {
      email: payload,
    });

    yield put(signInSuccess(data));
  } catch (err) {
    yield put(signInFailure());
    Alert.alert('Falha na autenticação, verique seus dados');
  }
}

export default all([takeLatest(SIGN_IN_REQUEST, signin)]);
