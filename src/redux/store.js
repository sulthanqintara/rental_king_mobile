import {createStore, applyMiddleware, combineReducers} from 'redux';
import rpm from 'redux-promise-middleware';

import authReducer from './reducers/auth';
import vehicleState from './reducers/vehicle';

const reducers = combineReducers({
  auth: authReducer,
  vehicle: vehicleState,
});
const enhancers = applyMiddleware(rpm);

const reduxStore = createStore(reducers, enhancers);
export default reduxStore;
