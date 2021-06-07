import { GLOBALTYPES } from './globalTypes';
import { getDataAPI, patchDataAPI } from '../../api/fetchData';
import { imageUpload } from '../../api/imageUpload';

export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER',
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