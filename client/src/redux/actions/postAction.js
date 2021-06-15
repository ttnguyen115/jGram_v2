import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../api/fetchData';
import { imageUpload } from '../../api/imageUpload';
import { GLOBALTYPES } from "./globalTypes";
import { createNotify, deleteNotify } from "./notifyAction";

export const POST_TYPE = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}

export const createPost = ({ content, images, authReducer, socketReducer }) => async (dispatch) => {
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

        //  Notify
        const msg = {
            id: res.data.newPost._id,
            text: 'Upload a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${res.data.newPost._id}`,
            content,
            image: media[0].url,
        }

        dispatch(createNotify({ msg, authReducer, socketReducer }));

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

export const likePost = ({ post, authReducer, socketReducer }) => async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, authReducer.user] }
    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });

    socketReducer.emit('likePost', newPost);

    try {
        await patchDataAPI(`post/${post._id}/like`, null, authReducer.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}

export const unlikePost = ({ post, authReducer, socketReducer }) => async (dispatch) => {
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== authReducer.user._id) }
    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost })

    socketReducer.emit('unlikePost', newPost);
    
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

export const deletePost = ({ post, authReducer, socketReducer }) => async (dispatch) => {
    dispatch({ type: POST_TYPE.DELETE_POST, payload: post });

    try {
        const res = await deleteDataAPI(`post/${post._id}`, authReducer.token);

        //  Notify
        const msg = {
            id: post._id,
            text: 'Deleted a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`
        }

        dispatch(deleteNotify({ msg, authReducer, socketReducer }));

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
