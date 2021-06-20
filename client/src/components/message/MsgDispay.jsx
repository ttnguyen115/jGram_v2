import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { imageShow } from '../../api/mediaShow';
import { deleteMessages } from '../../redux/actions/messageAction';
import Avatar from '../Avatar';

const MsgDisplay = ({user, msg, data}) => {
    const dispatch = useDispatch();
    const { authReducer } = useSelector(state => state);

    const handleDeleteMessages = () => {
        if (!data) return;
        
        if (window.confirm('Do you want to delete this message?')) {
            dispatch(deleteMessages({ msg, data, authReducer }))
        }
    }

    return (
        <>
            <div className="flex mb-1">
                <Avatar src={user.avatar} size={1} />
                <span>{user.username}</span>
            </div>

            <div className="flex items-center your_message">
                { user._id === authReducer.user._id && <DeleteIcon color="primary" onClick={handleDeleteMessages} /> }
                
                <div className="">
                    { msg.content && <div className="px-3 py-2 mb-1 chat_text">{msg.content}</div> }

                    {
                        msg.media.map((image, index) => (
                            <div key={index}>
                                {imageShow(image.url)}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="text-gray-500 text-md">
                {new Date(msg.createdAt).toLocaleString()}
            </div>
        </>
    )
}

export default MsgDisplay
