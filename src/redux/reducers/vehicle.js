import {ActionType} from 'redux-promise-middleware';

const defaultState = {
  vehicleData: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isLogin: false,
};

const vehicleReducer = (prevstate = defaultState, action) => {
  const {Pending, Fulfilled, Rejected} = ActionType;

  switch (action.type) {
    case 'GET_VEHICLES'.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_VEHICLES'.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case 'GET_VEHICLES'.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        vehicleData: action.payload.data.result.data,
      };

    default:
      return defaultState;
  }
};

export default vehicleReducer;
