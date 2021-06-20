import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_TYPE } from './redux/actions/postAction';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';
import { MESS_TYPES } from './redux/actions/messageAction';

const spawnNotifications = (body, icon, url, title) => {
    let options = {
        body, icon
    };
    let n = new Notification(title, options);

    n.onclick = e => {
        e.preventDefault();

        window.open(url, '_blank');
    }
}

const SocketClient = () => {
    const { authReducer, socketReducer, notifyReducer, onlineReducer } = useSelector(state => state);
    const dispatch = useDispatch()
    
    // joinUser
    useEffect(() => {
        socketReducer.emit('joinUser', authReducer.user);
    }, [socketReducer, authReducer.user])

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
            spawnNotifications(
                msg.user.username + ' ' + msg.text,
                msg.user.avatar,
                msg.url,
                'jGram v2.0'
            )
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

    // Message
    useEffect(() => {
        socketReducer.on('addMessageToClient', msg => {
            dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });
            dispatch({ 
                type: MESS_TYPES.ADD_USER, 
                payload: { 
                    ...msg.user, 
                    content: msg.content, 
                    media: msg.media 
                } 
            });
        })

        return () => socketReducer.off('addMessageToClient')
    }, [socketReducer, dispatch])

    //  Check Online/Offline
    useEffect(() => {
        socketReducer.emit('checkUserOnline', authReducer.user);
    }, [socketReducer, authReducer.user])

    useEffect(() => {
        socketReducer.on('checkUserOnlineToMe', data => {
            data.forEach(item => {
                if (!onlineReducer.includes(item.id)) {
                    dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id });
                }
            })
        })

        return () => socketReducer.off('checkUserOnlineToMe')
    }, [socketReducer, dispatch, onlineReducer])
    
    useEffect(() => {
        socketReducer.on('checkUserOnlineToClient', id => {
            if (!onlineReducer.includes(id)) {
                dispatch({ type: GLOBALTYPES.ONLINE, payload: id });
            }
        })

        return () => socketReducer.off('checkUserOnlineToClient')
    }, [socketReducer, dispatch, onlineReducer])
    
    // Check user ofline
    useEffect(() => {
        socketReducer.on('CheckUserOffline', id => {
            dispatch({ type: GLOBALTYPES.OFFLINE, payload: id });
        })

        return () => socketReducer.off('CheckUserOffline')
    }, [socketReducer, dispatch])

    return <>
        
    </>
}

export default SocketClient
