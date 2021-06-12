import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const CommentMenu = ({post, comment, auth}) => {
    const MenuItem = () => {
        return (
            <>
                <div className="flex my-2 dropdown-item">
                    <AddCircleOutlineOutlinedIcon /> Edit
                </div>
                
                <div className="flex my-2 dropdown-item">
                    <DeleteOutlineOutlinedIcon /> Remove
                </div>
            </>
        )
    }

    return (
        <div className="menu">
            {
                (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
                <div className="cursor-pointer dropdown nav-item">
                    <MoreVertIcon id="moreLink" data-toggle="dropdown" />

                    <div className="absolute right-0 dropdown-menu left-inherit" aria-labelledby="moreLink">
                        {
                            post.user._id === auth.user._id 
                            ? comment.user._id === auth.user._id
                                ? MenuItem()
                                : <div className="flex my-2 dropdown-item">
                                    <DeleteOutlineOutlinedIcon /> Remove
                                </div>
                            : comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentMenu
