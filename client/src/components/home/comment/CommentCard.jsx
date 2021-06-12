import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeComment, updateComment, unlikeComment } from '../../../redux/actions/commentAction'
import Avatar from '../../Avatar'
import LikeBtn from '../../LikeBtn'
import CommentMenu from './CommentMenu'
import InputComment from '../InputComment'

const CommentCard = ({children, comment, post, commentId}) => {
    const dispatch = useDispatch();
    const { authReducer } = useSelector(state => state);
    
    const [content, setContent] = useState('');
    const [readMore, setReadMore] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [loadLike, setLoadLike] = useState(false);

    const [onReply, setOnReply] = useState(false);

    useEffect(() => {
        setContent(comment.content);

        if (comment.likes.find(like => like._id === authReducer.user._id)) {
            setIsLike(true);
        } 
    }, [comment, authReducer.user._id]);

    const handleUpdate = () => {
        if (comment.content !== content) {
            dispatch(updateComment({comment, post, content, authReducer}));
            setOnEdit(false);
        } else {
            setOnEdit(false);
        }
    }

    const handleLike = async () => {
        if (loadLike) return;
        setIsLike(true);

        setLoadLike(true);
        await dispatch(likeComment({ comment, post, authReducer }));
        setLoadLike(false);
    }
    
    const handleUnlike = async () => {
        if (loadLike) return;
        setIsLike(false);

        setLoadLike(true);
        await dispatch(unlikeComment({ comment, post, authReducer }));
        setLoadLike(false);
    }

    const handleReply = () => {
        if (onReply) return setOnReply(false);
        setOnReply({ ...comment, commentId });
    }

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    return (
        <div className="px-4 py-2 mt-2" style={styleCard}>
            <Link to={`/profile/${comment.user._id}`}
                className="flex text-black w-max"
            >
                <Avatar src={comment.user.avatar} size={1} />

                <h6 className="mx-2">{comment.user.username}</h6>
            </Link>

            <div className="flex items-center p-2 bg-gray-200 rounded-md rounded-tl-none">
                <div className="flex-fill">
                    {
                        onEdit
                        ? <textarea rows="10" value={content} onChange={e => setContent(e.target.value)} 
                            className="w-full border-none outline-none"
                        />
                        
                        : <div>
                            <span>
                                {
                                    content.length < 100 ? content :
                                    readMore ? content + ' ' : content.slice(0, 100) + '.....'
                                }
                            </span>

                            {
                                content.length > 100 &&
                                <span onClick={() => setReadMore(!readMore)}
                                    className="font-medium underline cursor-pointer"
                                >
                                    {readMore ? 'Hide content' : 'Read more'}
                                </span>
                            }
                        </div>
                    }

                    <div className="cursor-pointer">
                        <small className="mr-3 text-muted">{moment(comment.createdAt).fromNow()}</small>
                        <small className="mr-3 font-bold">{comment.likes.length} likes</small>
                        {
                            onEdit 
                            ? <>
                                <small className="mr-3 font-bold text-blue-700"
                                    onClick={handleUpdate}
                                >Update</small>
                                
                                <small className="mr-3 font-bold text-red-600"
                                    onClick={() => setOnEdit(false)}
                                >Cancel</small>
                            </>
                            : <small className="mr-3 font-bold text-blue-700"
                                onClick={handleReply}
                            >{onReply ? 'Cancel' : 'Reply'}</small>
                        }
                    </div>
                </div>
            
                <div className="flex items-center mx-2 cursor-pointer">
                    <LikeBtn size={"small"} isLike={isLike} 
                        handleLike={handleLike} handleUnlike={handleUnlike}  />
                    <CommentMenu post={post} comment={comment} auth={authReducer} setOnEdit={setOnEdit} />
                </div>
            </div>
        
            {
                onReply && 
                <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
                    <Link to={`/profile/${onReply.user._id}`} className="mr-2">
                        @{onReply.user.username}: 
                    </Link>
                </InputComment>
            }

            {children}
        </div>
    )
}

export default CommentCard
