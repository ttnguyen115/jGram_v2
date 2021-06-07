import { combineReducers } from 'redux'
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import themeReducer from './themeReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    authReducer,
    alertReducer,
    themeReducer,
    profileReducer,
})