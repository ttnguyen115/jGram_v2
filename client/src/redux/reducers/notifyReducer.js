import { NOTIFY_TYPES } from "../actions/notifyAction";

const initalState = {
    loading: false,
    data: [],
}

const notifyReducer = (state = initalState, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.GET_NOTIFIES:
            return {
                ...state,
                data: action.payload
            }
    
        default:
            return state;
    }
}

export default notifyReducer