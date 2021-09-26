import axios from 'axios';
import {getData} from '../asyncStorage';

const url = 'http://192.168.0.100:8000';

export const postTransactions = body => {
  return getData('token').then(token =>
    axios.post(`${url}/transactions`, body, {
      headers: {'x-access-token': `Bearer ${token}`},
    }),
  );
};

export const getTransactionByID = id => {
  return getData('token').then(token =>
    axios.get(`${url}/transactions/${id}`, {
      headers: {'x-access-token': `Bearer ${token}`},
    }),
  );
};
export const patchTransaction = body => {
  return getData('token').then(token =>
    axios.patch(`${url}/transactions`, body, {
      headers: {'x-access-token': `Bearer ${token}`},
    }),
  );
};
