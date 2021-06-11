import { GLOBALTYPES } from "./globalTypes"
import { imageUpload } from '../../api/imageUpload';
import { postDataAPI } from '../../api/fetchData';

export const POST_TYPE = {
    CREATE_POST: 'CREATE_POST'
}

export const createPost = ({ content, images, authReducer }) => async (dispatch) => {
    let media = [];
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        
        if (images.length > 0) media = await imageUpload(images);
        const res = await postDataAPI('posts', { content, images: media }, authReducer.token);

        dispatch({ type: POST_TYPE.CREATE_POST, payload: res.data.newPost });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}