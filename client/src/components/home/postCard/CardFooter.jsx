import React from 'react'
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const CardFooter = ({post}) => {
    return (
        <div className="pb-3">
            <div className="flex justify-between px-4 cursor-pointer">
                <div className="">
                    <FavoriteBorderIcon className="m-2" />
                    
                    <Link to={`/post/${post._id}`} className="m-2">
                        <ChatBubbleOutlineIcon />
                    </Link>

                    <ShareIcon className="m-2" />
                </div>
                
                <BookmarkBorderIcon />
            </div>
            
            <div className="flex justify-between">
                <h6 className="px-8 curor-pointer">{post.likes.length}</h6>
                        
                <h6 className="px-8 curor-pointer">{post.comments.length} comments</h6>
            </div>
        </div>
    )
}

export default CardFooter
