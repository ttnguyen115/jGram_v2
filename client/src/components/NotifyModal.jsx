import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAllNotifies, isReadNotify } from '../redux/actions/notifyAction';
import Avatar from './Avatar';

const NotifyModal = () => {
    const dispatch = useDispatch();
    const { authReducer, notifyReducer } = useSelector(state => state);

    const handleIsRead = (msg) => {
        dispatch(isReadNotify({ msg, authReducer }))
    }

    const handleDeleteAll = () => {
        const newArr = notifyReducer.data.filter(item => item.isRead === false);
        if (newArr.length === 0) return dispatch(deleteAllNotifies(authReducer.token));

        if (window.confirm(`You have ${newArr.length} unread notices. Are you sure to delete all?`)) {
            return dispatch(deleteAllNotifies(authReducer.token));
        }
    }

    return (
        <div className="min-w-280px">
            <div className="px-3">
                <h3 className="text-2xl font-bold">Notifications</h3>
                
                <hr className="mt-1" />
                
                {
                    notifyReducer.data.length === 0 && 'No notifications'
                }

            </div>
            
            <div className="overflow-auto" style={{ maxHeight: 'calc(1000vh - 200px)' }} >
                {
                    notifyReducer.data.map((msg, index) => (
                        <div className="px-2 mb-3" key={index}>
                            <Link to={`${msg.url}`} className="flex items-center" 
                                onClick={() => handleIsRead(msg)}
                            >
                                <Avatar size={1} src={msg.user.avatar} />
                                
                                <div className="mx-1 flex-fill">
                                    <div className="">
                                        <strong className="mr-1">{msg.user.username}</strong>

                                        <span>{msg.text}</span>
                                    </div>

                                    {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
                                </div>

                                <div className="w-30px">
                                    {msg.image && <Avatar src={msg.image} size={3} />}
                                </div>
                            </Link>

                            <small className="flex justify-between text-gray-400">
                                {moment(msg.createdAt).fromNow()}
                                {
                                    !msg.isRead && <FiberManualRecordIcon color="primary" fontSize="small" />
                                }
                            </small>
                        </div>
                    )) 
                }
            </div>

            <hr className="my-1" />

            <div className="mr-2 text-right text-red-500 cursor-pointer"
                onClick={handleDeleteAll}
            >
                Delete All
            </div>
        </div>
    )
}

export default NotifyModal
