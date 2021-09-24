import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rpm from 'redux-promise-middleware';

import authReducer from './reducers/auth';
import vehicleState from './reducers/vehicle';

const persistAuth = {
  key: 'auth',
  storage: AsyncStorage,
};
const persistVehicle = {
  key: 'vehice',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  auth: persistReducer(persistAuth, authReducer),
  vehicle: persistReducer(persistVehicle, vehicleState),
});

const enhancers = applyMiddleware(rpm);

export default () => {
  const reduxStore = createStore(reducers, enhancers);
  const persist = persistStore(reduxStore);
  return {reduxStore, persist};
};
