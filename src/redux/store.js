import {createStore, applyMiddleware, combineReducers} from 'redux';
import rpm from 'redux-promise-middleware';

import authReducer from './reducers/auth';

const reducers = combineReducers({
  auth: authReducer,
});
const enhancers = applyMiddleware(rpm);

const reduxStore = createStore(reducers, enhancers);
export default reduxStore;
