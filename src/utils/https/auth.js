import axios from 'axios';
import {getData} from '../asyncStorage';

const url = 'http://192.168.0.100:8000';

export const postLogin = body => {
  return axios.post(`${url}/auth/login`, body);
};

export const postRegister = body => {
  return axios.post(`${url}/auth/register`, body);
};

export const deleteLogout = () => {
  return getData('token').then(token =>
    axios.delete(`${url}/auth/logout`, {token: token}),
  );
};
