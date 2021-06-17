import { postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI } from '../../api/fetchData';
import { GLOBALTYPES } from './globalTypes';

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}

export const createNotify = ({msg, authReducer, socketReducer}) => async (dispatch) => {
    try {
        const res = await postDataAPI('notify', msg, authReducer.token);
       
        socketReducer.emit('createNotify', {
            ...res.data.notify,
            user: {
                username: authReducer.user.username,
                avatar: authReducer.user.avatar
            }
        });
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}

export const deleteNotify = ({msg, authReducer, socketReducer}) => async (dispatch) => {
    try {
        await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, authReducer.token);
        
        socketReducer.emit('deleteNotify', msg);

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('notifies', token);
        
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies });
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}

export const isReadNotify = ({msg, authReducer}) => async (dispatch) => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: { ...msg, isRead: true } });

    try {
        await patchDataAPI(`/isReadNotify/${msg._id}`, null, authReducer.token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}

export const deleteAllNotifies = (token) => async (dispatch) => {
    dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: [] });

    try {
        await deleteDataAPI('deleteAllNotify', token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}