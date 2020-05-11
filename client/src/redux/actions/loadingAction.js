import {SET_LOADING_STATE} from '../constants/loadingConstant';

export const loadingAction = value => ({
  type: SET_LOADING_STATE,
  payload: value,
});
