import axios from 'axios';
import {getData} from '../asyncStorage';
import {API_URL} from '@env';

export const postTransactions = body => {
  return getData('token').then(token =>
    axios.post(`${API_URL}/transactions`, body, {
      headers: {'x-access-token': `Bearer ${token}`},
    }),
  );
};

export const getTransactionByID = id => {
  return getData('token').then(token =>
    axios.get(`${API_URL}/transactions/${id}`, {
      headers: {'x-access-token': `Bearer ${token}`},
    }),
  );
};

export const getTransaction = (params, token) => {
  return axios.get(`${API_URL}/transactions`, {
    params,
    headers: {'x-access-token': `Bearer ${token}`},
  });
};

export const patchTransaction = body => {
  return getData('token').then(token =>
    axios.patch(`${API_URL}/transactions`, body, {
      headers: {'x-access-token': `Bearer ${token}`},
    }),
  );
};
