import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, getDataAPI } from '../../api/fetchData'

export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    GET_MESSAGES: 'GET_MESSAGES',
}

export const addUser = ({user, messageReducer}) => async (dispatch) => {
    if (messageReducer.users.every(item => item._id !== user._id)) {
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } })
    }
}

export const addMessage = ({msg, authReducer, socketReducer}) => async (dispatch) => {
    dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });

    socketReducer.emit('addMessage', msg);

    try {
        await postDataAPI('message', msg, authReducer.token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getConversations = ({authReducer, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`conversations?limit=${page * 9}`, authReducer.token)
        let newArr = [];
        
        res.data.conversations.forEach(item => {
            item.recipients.forEach(cv => {
                if (cv._id !== authReducer.user._id) {
                    newArr.push({ ...cv, content: item.content, media: item.media })
                }
            })
        })

        dispatch({ 
            type: MESS_TYPES.GET_CONVERSATIONS, 
            payload: { newArr, result: res.data.result } 
        });

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getMessages = ({authReducer, id, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, authReducer.token);
        dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: res.data })

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}