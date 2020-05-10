import {AUTH} from '../constants/authConstant';

const initialState = {
  auth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return {...state, auth: action.payload};
    default:
      return state;
  }
};
