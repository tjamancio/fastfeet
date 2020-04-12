import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import reducers from './modules/rootReducer';
import sagas from './modules/rootSaga';
import persistReducers from './persistReducers';

const middlewares = [];

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
  : compose(applyMiddleware(...middlewares));

const store = createStore(persistReducers(reducers), composer);

const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
