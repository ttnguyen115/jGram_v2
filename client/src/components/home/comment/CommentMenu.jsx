import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../redux/actions/commentAction';

const CommentMenu = ({post, comment, setOnEdit}) => {
    const dispatch = useDispatch();
    const { authReducer, socketReducer } = useSelector(state => state);

    const handleRemove = () => {
        if (post.user._id === authReducer.user._id || comment.user._id === authReducer.user._id) {
            dispatch(deleteComment({ post, authReducer, comment, socketReducer }));
        }
    }
    
    const MenuItem = () => {
        return (
            <>
                <div className="flex my-2 dropdown-item" onClick={() => setOnEdit(true)}>
                    <AddCircleOutlineOutlinedIcon /> Edit
                </div>
                
                <div className="flex my-2 dropdown-item" onClick={handleRemove}>
                    <DeleteOutlineOutlinedIcon /> Remove
                </div>
            </>
        )
    }

    return (
        <div className="menu">
            {
                (post.user._id === authReducer.user._id || comment.user._id === authReducer.user._id) &&
                <div className="cursor-pointer dropdown nav-item">
                    <MoreVertIcon id="moreLink" data-toggle="dropdown" />

                    <div className="absolute right-0 dropdown-menu left-inherit transform-none" aria-labelledby="moreLink">
                        {
                            post.user._id === authReducer.user._id 
                            ? comment.user._id === authReducer.user._id
                                ? MenuItem()
                                : <div className="flex my-2 dropdown-item" onClick={handleRemove}>
                                    <DeleteOutlineOutlinedIcon /> Remove
                                </div>
                            : comment.user._id === authReducer.user._id && MenuItem()
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentMenu
