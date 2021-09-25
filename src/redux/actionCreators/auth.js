import {deleteLogout, postLogin} from '../../utils/https/auth';
import {patchProfile} from '../../utils/https/profile';

export const loginAction = body => {
  return {type: 'SIGN_IN', payload: postLogin(body)};
};
export const logoutAction = body => {
  return {type: 'SIGN_OUT', payload: deleteLogout()};
};
export const profileAction = (body, params) => {
  return {type: 'PROFILE_PATCH', payload: patchProfile(body, params)};
};
