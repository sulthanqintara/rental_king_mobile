import axios from 'axios';
import {API_URL} from '@env';

export const getVehicles = params => {
  return axios.get(`${API_URL}/vehicles`, {params: params});
};
export const addVehicles = (body, token) => {
  return axios.post(`${API_URL}/vehicles`, body, {
    headers: {'x-access-token': `Bearer ${token}`},
    'Content-Type': 'multipart/form-data',
  });
};
