import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likePost, unlikePost } from '../../../redux/actions/postAction';
import LikeBtn from '../../LikeBtn';

const CardFooter = ({post}) => {
    const dispatch = useDispatch();
    const { authReducer } = useSelector(state => state);
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);

    useEffect(() => {
        if (post.likes.find(like => like._id === authReducer.user._id)) {
            setIsLike(true);
        }
    }, [authReducer.user._id, post.likes]);

    const handleLike = async () => {
        if (loadLike) return;
        setIsLike(true);
        
        setLoadLike(true);
        await dispatch(likePost({ post, authReducer }));
        setLoadLike(false);
    }
    
    const handleUnlike = async () => {
        if (loadLike) return;
        setIsLike(false);

        setLoadLike(true);
        await dispatch(unlikePost({ post, authReducer }));
        setLoadLike(false);
    }

    return (
        <div className="pb-3">
            <div className="flex justify-between px-4 cursor-pointer">
                <div className="">
                    <LikeBtn isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike} size={"large"} />
                    
                    <Link to={`/post/${post._id}`} className="m-2">
                        <ChatBubbleOutlineIcon fontSize="large"  />
                    </Link>

                    <ShareIcon className="m-2" fontSize="large" />
                </div>
                
                <BookmarkBorderIcon fontSize="large" />
            </div>
            
            <div className="flex justify-between">
                <h6 className="px-5 font-semibold curor-pointer">{post.likes.length} likes</h6>
                        
                <h6 className="px-8 font-semibold curor-pointer">{post.comments.length} comments</h6>
            </div>
        </div>
    )
}

export default CardFooter
