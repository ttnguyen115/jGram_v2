import { GLOBALTYPES, DeleteData } from './globalTypes';
import { getDataAPI, patchDataAPI } from '../../api/fetchData';
import { imageUpload } from '../../api/imageUpload';

export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
}

export const getProfileUsers = ({users, id, authReducer}) => async (dispatch) => {
    if (users.every(user => user._id !== id)) {
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload: true});
            const res = await getDataAPI(`/user/${id}`, authReducer.token);
            dispatch({
                type: PROFILE_TYPES.GET_USER,
                payload: res.data
            })
            dispatch({type: PROFILE_TYPES.LOADING, payload: false});

        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: err.response.data.msg
                }
            });
        }
    }
}

export const updateProfileUser = ({userData, avatar, authReducer}) => async (dispatch) => {
    if (!userData.fullname)
        return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: "Please add your full name!"}
        })

    if (userData.fullname.length > 25) 
        return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: "Maximum full name is 25 characters!"}
        })
    
    if (userData.story.length > 200) 
        return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: "Maximum story is 200 characters!"}
        })

    try {
        let media;
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} });

        if (avatar) media = await imageUpload([avatar]); 

        const res = await patchDataAPI("user", {
            ...userData,
            avatar: avatar ? media[0].url : authReducer.user.avatar
        }, authReducer.token)

        dispatch({ 
            type: GLOBALTYPES.AUTH,
            payload: {
                ...authReducer,
                user: {
                    ...authReducer.user,
                    ...userData,
                    avatar: avatar ? media[0].url : authReducer.user.avatar,
                }
            }
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const follow = ({ users, user, authReducer }) => async (dispatch) => {
    let newUser;
    
    if (users.every(item => item._id !== user._id)) {
        newUser = { ...user, followers: [...user.followers, authReducer.user] };
    } else {
        users.forEach(item => {
            if (item._id === user._id) {
                newUser = { ...item, followers: [...item.followers, authReducer.user] }
            }
        })
    }
    
    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });

    dispatch({ 
        type: GLOBALTYPES.AUTH, 
        payload: {
            ...authReducer,
            user: {
                ...authReducer.user, 
                following: [...authReducer.user.following, newUser]
            }
        } 
    });

    try {
        await patchDataAPI(`user/${user._id}/follow`, null, authReducer.token);
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.res.data.msg }
        });
    }
}

export const unfollow = ({ users, user, authReducer }) => async (dispatch) => {
    let newUser;

    if (users.every(item => item._id !== user._id)) {
        newUser = { ...user, followers: DeleteData(user.followers, authReducer.user._id) };
    } else {
        users.forEach(item => {
            if (item._id === user._id) {
                newUser = { ...item, followers: DeleteData(item.followers, authReducer.user._id) };
            }
        })
    }
    
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });

    dispatch({ 
        type: GLOBALTYPES.AUTH, 
        payload: {
            ...authReducer,
            user: {
                ...authReducer.user, 
                following: DeleteData(authReducer.user.following, newUser._id)
            }
        } 
    });

    try {
        await patchDataAPI(`user/${user._id}/unfollow`, null, authReducer.token);
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.res.data.msg }
        });
    }
}