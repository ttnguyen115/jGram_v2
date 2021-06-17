import { combineReducers } from 'redux'
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import themeReducer from './themeReducer';
import profileReducer from './profileReducer';
import statusReducer from './statusReducer';
import postReducer from './postReducer';
import modalReducer from './modalReducer';
import detailPostReducer from './detailPostReducer';
import discoverReducer from './discoverReducer';
import suggestionsReducer from './suggestionsReducer';
import socketReducer from './socketReducer';
import notifyReducer from './notifyReducer';
import messageReducer from './messageReducer';

export default combineReducers({
    authReducer,
    alertReducer,
    themeReducer,
    profileReducer,
    statusReducer,
    postReducer,
    modalReducer,
    detailPostReducer,
    discoverReducer,
    suggestionsReducer,
    socketReducer,
    notifyReducer,
    messageReducer,
})