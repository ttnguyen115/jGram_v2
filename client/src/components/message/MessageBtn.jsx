import React from 'react'
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MESS_TYPES } from '../../redux/actions/messageAction';

const MessageBtn = ({user}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { onlineReducer } = useSelector(state => state)
    
    const handleAddUser = (user) => {
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
        dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: onlineReducer });
        return history.push(`/message/${user._id}`);
    }

    return (
        <div className="mx-2">
            <Button variant="contained" color="primary" onClick={() => handleAddUser(user)}>
                Message
            </Button>
        </div>
    )
}

export default MessageBtn
