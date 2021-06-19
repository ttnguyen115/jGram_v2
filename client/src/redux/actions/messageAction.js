export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
}

export const addUser = ({user, messageReducer}) => async (dispatch) => {
    if (messageReducer.users.every(item => item._id !== user._id)) {
        dispatch({ type: MESS_TYPES.ADD_USER, payload: user })
    }
}

export const addMessage = ({msg, authReducer, socketReducer}) => async (dispatch) => {
    console.log(msg);
    dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg })
}