import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { BASE_URL } from '../../../api/config';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { deletePost } from '../../../redux/actions/postAction';
import Avatar from '../../Avatar';

const CardHeader = ({post}) => {
    const { authReducer, socketReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleEdit = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure to delete this post?")) {
            dispatch(deletePost({ post, authReducer, socketReducer }));
        }
        
        return history.push('/');
     }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }

    return (
        <div className="flex items-center justify-between px-3 py-3 cursor-pointer">
            <div className="flex">
                <Avatar src={post.user.avatar} size={3} />

                <div className="ml-4">
                    <h6 className="m-0 font-medium">
                        <Link to={`/profile/${post.user._id}`} className="text-black">
                            {post.user.username}
                        </Link>
                    </h6>

                    <small className="text-gray-400">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>

            <div className="nav-item dropdown">
                <MoreHorizIcon data-toggle="dropdown" />

                <div className="absolute right-0 left-inherit dropdown-menu transform-none">
                    {
                        authReducer.user._id === post.user._id &&
                        <>
                            <div className="flex my-1 dropdown-item"
                                onClick={handleEdit}
                            >
                                <span><EditIcon /></span> Edit Post
                            </div>
                            
                            <div className="flex my-1 dropdown-item"
                                onClick={handleDelete}
                            >
                                <span><DeleteIcon /></span> Remove Post
                            </div>
                        </>
                    }

                    <div className="flex my-1 dropdown-item" onClick={handleCopyLink} >
                        <span><FileCopyOutlinedIcon /></span> Copy Link
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHeader
