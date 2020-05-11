import {SET_LOADING_STATE} from '../constants/loadingConstant';

const initialState = {
  loadingState: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_LOADING_STATE:
      return {...state, loadingState: payload};

    default:
      return state;
  }
};
