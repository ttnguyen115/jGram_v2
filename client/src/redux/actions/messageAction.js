export const MESS_TYPES = {
    ADD_USER: 'ADD_USER'
}

export const addUser = ({user, messageReducer}) => async (dispatch) => {
    if (messageReducer.users.every(item => item._id !== user._id)) {
        dispatch({ type: MESS_TYPES.ADD_USER, payload: user })
    }
}