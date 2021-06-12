import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard';

const Posts = () => {
    const { postReducer } = useSelector(state => state);

    return (
        <div>
            {
                postReducer.posts.map(post => (
                    <PostCard post={post} key={post._id} />
                ))
            }
        </div>
    )
}

export default Posts
