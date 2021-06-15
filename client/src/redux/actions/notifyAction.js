import { postDataAPI, deleteDataAPI } from '../../api/fetchData';
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
        console.log(res);
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}

export const deleteNotify = ({msg, authReducer, socketReducer}) => async (dispatch) => {
    try {
        const res = await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, authReducer.token);
        console.log(res);

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}