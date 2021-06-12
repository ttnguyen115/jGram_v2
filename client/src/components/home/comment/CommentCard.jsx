import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import LikeBtn from '../../LikeBtn'
import CommentMenu from './CommentMenu'

const CommentCard = ({comment, post}) => {
    const dispatch = useDispatch();
    const { authReducer } = useSelector(state => state);
    const [content, setContent] = useState('');
    const [readMore, setReadMore] = useState(false);

    const [isLike, setIsLike] = useState(false);

    useEffect(() => {
        setContent(comment.content)
    }, [comment]);

    const handleLike = () => {
        
    }
    
    const handleUnlike = () => {
        
    }

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    return (
        <div className="px-4 py-2 mt-2" style={styleCard}>
            <Link to={`/profile/${comment.user._id}`}
                className="flex text-black"
            >
                <Avatar src={comment.user.avatar} size={1} />

                <h6 className="mx-2">{comment.user.username}</h6>
            </Link>

            <div className="flex items-center p-2 bg-gray-200 rounded-md rounded-tl-none">
                <div className="flex-fill">
                    <div className="">
                        <span>
                            {
                                content.length < 100 ? content :
                                readMore ? content + ' ' : content.slice(0, 100) + '.....'
                            }
                        </span>

                        {
                            content.length > 100 &&
                            <span onClick={() => setReadMore(!readMore)}
                                className="font-bold text-blue-700 cursor-pointer"
                            >
                                {readMore ? 'Hide content' : 'Read more'}
                            </span>
                        }
                    </div>

                    <div className="cursor-pointer">
                        <small className="mr-3 text-muted">{moment(comment.createdAt).fromNow()}</small>
                        <small className="mr-3 font-bold">{comment.likes.length} likes</small>
                        <small className="mr-3 font-bold">Reply</small>
                    </div>
                </div>
            
                <div className="flex items-center mx-2 cursor-pointer">
                    <LikeBtn isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike} size={"small"} />
                    <CommentMenu post={post} comment={comment} auth={authReducer} />
                </div>
            </div>
        </div>
    )
}

export default CommentCard
