import Auth from './authReducer';
import Loading from './loadingReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({auth: Auth, loading: Loading});

export default reducers;
