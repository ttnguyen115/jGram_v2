import { POST_TYPE } from '../actions/postAction'
import { EditData } from '../actions/globalTypes'

const detailPostReducer = (state = [], action) => {
    switch (action.type) {
        case POST_TYPE.GET_POST:
            return [...state, action.payload]
        
        case POST_TYPE.UPDATE_POST:
            return EditData(state, action.payload._id, action.payload)
    
        default:
            return state;
    }
}

export default detailPostReducer