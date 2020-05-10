import {AUTH} from '../constants/authConstant';

export const setAuthenticated = value => dispatch => {
  console.log('Working');
  dispatch({
    type: AUTH,
    payload: value,
  });
};
