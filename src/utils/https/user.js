import axios from 'axios';
import {getData} from '../asyncStorage';
import {API_URL} from '@env';

export const patchProfile = (body, params) => {
  return getData('token').then(token =>
    axios
      .patch(`${API_URL}/users/${params}`, body, {
        headers: {'x-access-token': `Bearer ${token}`},
      })
      .catch(err => console.log(err)),
  );
};
export const updatePassword = (body, params, token) => {
  return axios.patch(`${API_URL}/users/password/${params}`, body, {
    headers: {'x-access-token': `Bearer ${token}`},
  });
};

export const postForgotPasswordCode = body => {
  return axios.post(`${API_URL}/users/forgot_password`, body);
};
export const checkForgotPasswordCode = body => {
  return axios.post(`${API_URL}/users/forgot_password/check`, body);
};
export const patchForgotPassword = body => {
  return axios.patch(`${API_URL}/users/forgot_password/change`, body);
};
