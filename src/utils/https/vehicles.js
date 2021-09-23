import axios from 'axios';
const url = 'http://192.168.0.100:8000';

export const getVehicles = params => {
  return axios.get(`${url}/vehicles`, {params: params});
};
