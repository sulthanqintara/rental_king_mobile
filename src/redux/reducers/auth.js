import {ActionType} from 'redux-promise-middleware';
import {storeData} from '../../utils/asyncStorage';

const defaultState = {
  authInfo: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isLogin: false,
  error: {},
  token: '',
};

const authReducer = (prevstate = defaultState, action) => {
  const {Pending, Fulfilled, Rejected} = ActionType;

  switch (action.type) {
    case 'SIGN_IN'.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'SIGN_IN'.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        isLogin: false,
        error: action.payload,
      };
    case 'SIGN_IN'.concat('_', Fulfilled):
      storeData('token', action.payload.data.result.token);
      storeData('userInfo', '');
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        isLogin: true,
        error: '',
        authInfo: action.payload.data.result.userInfo,
        token: action.payload.data.result.token,
      };
    case 'SIGN_OUT'.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'SIGN_OUT'.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case 'SIGN_OUT'.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        authInfo: {},
        isLogin: false,
        token: '',
      };
    default:
      return prevstate;
  }
};

export default authReducer;
