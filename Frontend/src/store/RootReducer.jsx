import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import authReducer from './slice/auth';

const rootPersistConfig ={
    key:'root',
    storage,
    keyPrefix:'redux-',
    whitelist:['auth']
};

const rootReducer = combineReducers({
    auth: authReducer,
});

export {rootPersistConfig, rootReducer};