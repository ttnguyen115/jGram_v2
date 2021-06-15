import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SocketClient = () => {
    const { authReducer, socketReducer } = useSelector(state => state);
    const dispatch = useDispatch()
    
    // joinUser
    useEffect(() => {
        socketReducer.emit('joinUser', authReducer.user._id);
    }, [socketReducer, authReducer.user._id])

    // Likes
    useEffect(() => {
        socketReducer.on('likeToClient', newPost => {
            console.log(newPost)
        });
    }, [socketReducer])


    return <>

    </>
}

export default SocketClient
