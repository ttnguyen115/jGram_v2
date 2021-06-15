import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../api/config';
import { likePost, savePost, unlikePost, unsavePost } from '../../../redux/actions/postAction';
import LikeBtn from '../../LikeBtn';
import ShareModal from '../../ShareModal';

const CardFooter = ({post}) => {
    const dispatch = useDispatch();
    const { authReducer, themeReducer, socketReducer } = useSelector(state => state);
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [saved, setSaved] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false)

    // Fetch likes
    useEffect(() => {
        if (post.likes.find(like => like._id === authReducer.user._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [authReducer.user._id, post.likes]);

    const handleLike = async () => {
        if (loadLike) return;
        
        setLoadLike(true);
        await dispatch(likePost({ post, authReducer, socketReducer }));
        setLoadLike(false);
    }
    
    const handleUnlike = async () => {
        if (loadLike) return;

        setLoadLike(true);
        await dispatch(unlikePost({ post, authReducer, socketReducer }));
        setLoadLike(false);
    }

    // Fetch saved post
    useEffect(() => {
        if (authReducer.user.saved.find(id => id === post._id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [authReducer.user.saved, post._id]);

    const handleSavePost = async () => {
        if (saveLoad) return;
        
        setSaveLoad(true);
        await dispatch(savePost({ post, authReducer }))
        setSaveLoad(false);
    }
    
    const handleUnsavePost = async () => {
        if (saveLoad) return;

        setSaveLoad(true);
        await dispatch(unsavePost({ post, authReducer }));
        setSaveLoad(false);
    }

    return (
        <div className="pb-3">
            <div className="flex justify-between px-4 cursor-pointer">
                <div className="">
                    <LikeBtn isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike} size={"large"} />
                    
                    <Link to={`/post/${post._id}`} className="m-2">
                        <ChatBubbleOutlineIcon fontSize="large"  />
                    </Link>

                    <ShareIcon className="m-2" fontSize="large" onClick={() => setIsShare(!isShare)} />
                </div>
                
                {
                    saved
                    ? <BookmarkIcon fontSize="large" color="primary" 
                        onClick={handleUnsavePost}
                    />
                    : <BookmarkBorderIcon fontSize="large" 
                        onClick={handleSavePost}
                    />
                }
            </div>
            
            <div className="flex justify-between">
                <h6 className="px-5 font-semibold curor-pointer">{post.likes.length} likes</h6>
                        
                <h6 className="px-8 font-semibold curor-pointer">{post.comments.length} comments</h6>
            </div>

            {
                isShare && 
                <ShareModal url={`${BASE_URL}/post/${post._id}`} themeReducer={themeReducer} />
            }
        </div>
    )
}

export default CardFooter
