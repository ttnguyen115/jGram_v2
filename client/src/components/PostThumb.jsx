import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const PostThumb = ({posts, result}) => {
    const { themeReducer } = useSelector(state => state);

    if (result === 0) return <h2 className="text-2xl font-bold text-center">No Post</h2>

    return (
        <div className="grid justify-center w-full grid-cols-posts gap-2.5 overflow-hidden my-3">
            {
                posts.map(post => (
                    <Link key={post._id} to={`/post/${post._id}`} >
                        <div className="relative w-full overflow-hidden cursor-pointer min-w-300px h-300px post_thumb_content">
                            <img src={post.images[0].url} alt={post.images[0].url} 
                                style={{ filter: themeReducer ? 'invert(1)' : 'invert(0)' }}
                                className="block object-cover w-full h-full"
                            />

                            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition duration-300 bg-0008">
                                <span className="mx-4 text-white"><FavoriteBorderIcon fontSize="large" />{post.likes.length}</span>
                                
                                <span className="mx-4 text-white"><ChatBubbleOutlineIcon fontSize="large" />{post.comments.length}</span>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default PostThumb
