import axios from 'axios';
import {getData} from '../asyncStorage';
import {API_URL} from '@env';

export const postLogin = body => {
  return axios.post(`${API_URL}/auth/login`, body);
};

export const postRegister = body => {
  return axios.post(`${API_URL}/auth/register`, body);
};

export const deleteLogout = () => {
  return getData('token').then(token =>
    axios.delete(`${API_URL}/auth/logout`, {token: token}),
  );
};

export const getPatchToken = token => {
  return axios.get(`${API_URL}/auth/check`, {
    headers: {'x-access-token': `Bearer ${token}`},
  });
};
