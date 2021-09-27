import axios from 'axios';
import {getData} from '../asyncStorage';
import {API_URL} from '@env';

export const patchProfile = (body, params) => {
  return getData('token').then(token =>
    axios.patch(`${API_URL}/users/${params}`, body, {
      headers: {'x-access-token': `Bearer ${token}`},
    }),
  );
};
