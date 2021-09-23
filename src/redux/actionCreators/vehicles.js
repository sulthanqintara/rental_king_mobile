import {getVehicles} from '../../utils/https/vehicles';

export const getVehiclesAction = params => {
  return {type: 'GET_VEHICLES', payload: getVehicles(params)};
};
