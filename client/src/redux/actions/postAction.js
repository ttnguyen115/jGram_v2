import { GLOBALTYPES } from "./globalTypes"
import { imageUpload } from '../../api/imageUpload';
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from '../../api/fetchData';

export const POST_TYPE = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}

export const createPost = ({ content, images, authReducer }) => async (dispatch) => {
    let media = [];
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        
        if (images.length > 0) media = await imageUpload(images);
        const res = await postDataAPI('posts', { content, images: media }, authReducer.token);

        dispatch({ 
            type: POST_TYPE.CREATE_POST, 
            payload: {...res.data.newPost, user: authReducer.user} 
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}

export const getPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPE.LOADING_POST, payload: true });
        const res = await getDataAPI('posts', token);

        dispatch({ type: POST_TYPE.GET_POSTS, payload: { ...res.data, page: 2 } });

        dispatch({ type: POST_TYPE.LOADING_POST, payload: false });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const updatePost = ({ content, images, authReducer, statusReducer }) => async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    if (statusReducer.content === content && imgNewUrl.length === 0 && imgOldUrl.length === statusReducer.images.length) return;
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);
        const res = await patchDataAPI(`post/${statusReducer._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, authReducer.token);

        dispatch({ type: POST_TYPE.UPDATE_POST, payload: res.data.newPost });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}

export const likePost = ({ post, authReducer }) => async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, authReducer.user] }
    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost })

    try {
        await patchDataAPI(`post/${post._id}/like`, null, authReducer.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}

export const unlikePost = ({ post, authReducer }) => async (dispatch) => {
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== authReducer.user._id) }
    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost })
    
    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, authReducer.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}

export const getPost = ({ detailPostReducer, id, authReducer }) => async (dispatch) => {
    if (detailPostReducer.every(post =>  post._id !== id)) {
        try {
            const res = await getDataAPI(`post/${id}`, authReducer.token);
            dispatch({ type: POST_TYPE.GET_POST, payload: res.data.post });
            
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            });
        }
    }
}

export const deletePost = ({ post, authReducer }) => async (dispatch) => {
    dispatch({ type: POST_TYPE.DELETE_POST, payload: post });

    try {
        await deleteDataAPI(`post/${post._id}`, authReducer.token);

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}

export const savePost = ({ post, authReducer }) => async (dispatch) => {
    const newUser = { ...authReducer.user, saved: [...authReducer.user.saved, post._id] };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...authReducer, user: newUser } });

    try {
        await patchDataAPI(`savePost/${post._id}`, null, authReducer.token);
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}

export const unsavePost = ({ post, authReducer }) => async (dispatch) => {
    const newUser = { ...authReducer.user, saved: authReducer.user.saved.filter(id => id !== post._id) };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...authReducer, user: newUser } });

    try {
        await patchDataAPI(`unsavePost/${post._id}`, null, authReducer.token);
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}
