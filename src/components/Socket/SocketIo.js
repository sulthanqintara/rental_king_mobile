import {API_URL} from '@env';
// import {getData} from '../../utils/asyncStorage';

import io from 'socket.io-client';
// let uuid = getData('uuid').then(result => {
//   uuid = result;
//   console.log(uuid);
// });
let socket = io(API_URL);

export default socket;
