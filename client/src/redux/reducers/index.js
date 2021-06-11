import { combineReducers } from 'redux'
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import themeReducer from './themeReducer';
import profileReducer from './profileReducer';
import statusReducer from './statusReducer';
import postReducer from './postReducer';

export default combineReducers({
    authReducer,
    alertReducer,
    themeReducer,
    profileReducer,
    statusReducer,
    postReducer
})