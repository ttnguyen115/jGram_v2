import { postDataAPI } from '../../api/fetchData';
import { GLOBALTYPES } from './globalTypes';
import { POST_TYPE } from './postAction';

export const createComment = (post, newComment, authReducer) => async (dispatch) => {
    const newPost = {...post, comments: [...post.comments, newComment]};

    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });

    try {
        const data = { ...newComment, postId: post._id };
        const res = await postDataAPI('comment', data, authReducer.token);

        const newData = {...res.data.newComment, user: authReducer.user};
        const newPost = {...post, comments: [...post.comments, newData]};
        
        dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}