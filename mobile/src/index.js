import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './config/Reactotron';

import Routes from './routes';
import { persistor, store } from './store';

// import { Container } from './styles';

export default function src() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
