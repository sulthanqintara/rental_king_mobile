import axios from 'axios';
import {API_URL} from '@env';

export const getVehicles = params => {
  return axios.get(`${API_URL}/vehicles`, {params: params});
};
