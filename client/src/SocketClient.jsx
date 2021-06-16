import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_TYPE } from './redux/actions/postAction';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';

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
            dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost })
        });

        return () => socketReducer.off('likeToClient')
    }, [socketReducer, dispatch])

    useEffect(() => {
        socketReducer.on('unlikeToClient', newPost => {
            dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost })
        });

        return () => socketReducer.off('unlikeToClient')
    }, [socketReducer, dispatch])

    // Comments
    useEffect(() => {
        socketReducer.on('createCommentToClient', newPost => {
            dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost })
        });

        return () => socketReducer.off('createCommentToClient')
    }, [socketReducer, dispatch])
    
    useEffect(() => {
        socketReducer.on('deleteCommentToClient', newPost => {
            dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost })
        });

        return () => socketReducer.off('deleteCommentToClient')
    }, [socketReducer, dispatch])
    
    // Follow - Unfollow
    useEffect(() => {
        socketReducer.on('followToClient', newUser => {
            dispatch({ type: GLOBALTYPES.AUTH, payload: { ...authReducer, user: newUser } })
        });

        return () => socketReducer.off('followToClient')
    }, [socketReducer, dispatch, authReducer])
    
    useEffect(() => {
        socketReducer.on('unfollowToClient', newUser => {
            dispatch({ type: GLOBALTYPES.AUTH, payload: { ...authReducer, user: newUser } })
        });

        return () => socketReducer.off('unfollowToClient')
    }, [socketReducer, dispatch, authReducer])
    
    // Notifications
    useEffect(() => {
        socketReducer.on('createNotifyToClient', msg => {
            dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg })
        });

        return () => socketReducer.off('createNotifyToClient')
    }, [socketReducer, dispatch])
    
    useEffect(() => {
        socketReducer.on('deleteNotifyToClient', msg => {
            console.log(msg);
            dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg })
        });

        return () => socketReducer.off('deleteNotifyToClient')
    }, [socketReducer, dispatch])


    return <>

    </>
}

export default SocketClient
