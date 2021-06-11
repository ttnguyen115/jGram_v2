import { GLOBALTYPES } from "./globalTypes"
import { imageUpload } from '../../api/imageUpload';
import { getDataAPI, postDataAPI, patchDataAPI } from '../../api/fetchData';

export const POST_TYPE = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POSTS: 'UPDATE_POSTS'
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

        dispatch({ type: POST_TYPE.GET_POSTS, payload: res.data });

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

        dispatch({ type: POST_TYPE.UPDATE_POSTS, payload: res.data.newPost });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}
