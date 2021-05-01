import { SET_USER_CURR } from './actionTypes';

export default function setUserCurr(userCurr) {
  localStorage.setItem('user_curr', userCurr);
  return {
    type: SET_USER_CURR,
    value: userCurr,
  };
}
