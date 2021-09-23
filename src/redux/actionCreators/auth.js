import {deleteLogout, postLogin} from '../../utils/https/auth';

export const loginAction = body => {
  return {type: 'SIGN_IN', payload: postLogin(body)};
};
export const logoutAction = body => {
  return {type: 'SIGN_OUT', payload: deleteLogout()};
};
