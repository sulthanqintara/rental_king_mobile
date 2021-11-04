import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rpm from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';

import authReducer from './reducers/auth';
import transactionReducer from './reducers/transaction';

const persistAuth = {
  key: 'auth',
  storage: AsyncStorage,
};
const logger = createLogger();

const reducers = combineReducers({
  auth: persistReducer(persistAuth, authReducer),
  transaction: transactionReducer,
});

const enhancers = applyMiddleware(rpm, logger);

export default () => {
  const reduxStore = createStore(reducers, enhancers);
  const persist = persistStore(reduxStore);
  return {reduxStore, persist};
};
