const defaultState = {
  user_id: 0,
  model_id: 0,
  amount_rented: 0,
  prepayment: 0,
  rent_start_date: '',
  rent_finish_date: '',
  vehicleImage: '',
  model: '',
  duration: 0,
};

const transactionReducer = (prevstate = defaultState, action) => {
  switch (action.type) {
    case 'TRANSACTION':
      return {...prevstate, ...action.payload};

    default:
      return prevstate;
  }
};

export default transactionReducer;
