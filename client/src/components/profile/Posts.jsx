import React, { useEffect, useState } from 'react';
import PostThumb from '../PostThumb';

const Posts = ({authReducer, id, dispatch, profileReducer}) => {
    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(9);

    useEffect(() => {
        profileReducer.posts.forEach(data => {
            if (data._id === id) {
                setPosts(data.posts);
                setResult(data.result)
            }
        })
    }, [profileReducer.posts, id])

    return (
        <div>
            <PostThumb posts={posts} result={result} />
        </div>
    )
}

export default Posts
