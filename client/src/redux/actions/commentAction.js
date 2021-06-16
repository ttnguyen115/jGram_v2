import { patchDataAPI, postDataAPI, deleteDataAPI } from '../../api/fetchData';
import { EditData, GLOBALTYPES, DeleteData } from './globalTypes';
import { POST_TYPE } from './postAction';
import { createNotify, deleteNotify } from './notifyAction';

export const createComment = ({post, newComment, authReducer, socketReducer}) => async (dispatch) => {
    const newPost = {...post, comments: [...post.comments, newComment]};

    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });

    try {
        const data = { ...newComment, postId: post._id, postUserId: post.user._id };
        const res = await postDataAPI('comment', data, authReducer.token);

        const newData = {...res.data.newComment, user: authReducer.user};
        const newPost = {...post, comments: [...post.comments, newData]};
        
        dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });

        // Socket.io
        socketReducer.emit('createComment', newPost);

        //  Notify
        const msg = {
            id: res.data.newComment._id,
            text: newComment.reply ? 'mentioned you in a comment.' : 'commented on your post.',
            recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
            url: `/post/${post._id}`,
            content: post.content,
            image: post.images[0].url,
        }
        
        dispatch(createNotify({ msg, authReducer, socketReducer }));

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const updateComment = ({comment, post, content, authReducer}) => async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, { ...comment, content });
    const newPost = { ...post, comments: newComments };
    
    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });

    try {
        patchDataAPI(`comment/${comment._id}`, { content }, authReducer.token);

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const likeComment = ({comment, post, authReducer}) => async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, authReducer.user] };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };
    
    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });

    try {
        await patchDataAPI(`comment/${comment._id}/like`, null, authReducer.token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const unlikeComment = ({comment, post, authReducer}) => async (dispatch) => {
    const newComment = { ...comment, likes: DeleteData(comment.likes, authReducer.user._id) };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };
    
    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });

    try {
        await patchDataAPI(`comment/${comment._id}/unlike`, null, authReducer.token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const deleteComment = ({post, comment, authReducer, socketReducer}) => async (dispatch) => {
    const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment];
    
    const newPost = {
        ...post,
        comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    }

    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });

    socketReducer.emit('deleteComment', newPost);

    try {
        deleteArr.forEach(item => {
            deleteDataAPI(`comment/${item._id}`, authReducer.token);

            // Notify
            const msg = {
                id: item._id,
                text: comment.reply ? 'mentioned you in a comment.' : 'commented on your post.',
                recipients: comment.reply ? [comment.tag._id] : [post.user._id],
                url: `/post/${post._id}`,
            }
            
            dispatch(deleteNotify({ msg, authReducer, socketReducer }));
        });

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}