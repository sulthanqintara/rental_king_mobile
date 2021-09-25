import axios from 'axios';
import {getData} from '../asyncStorage';

const url = 'http://192.168.0.100:8000';

export const patchProfile = (body, params) => {
  return getData('token').then(token =>
    axios.patch(`${url}/users/${params}`, body, {
      headers: {'x-access-token': `Bearer ${token}`},
    }),
  );
};
